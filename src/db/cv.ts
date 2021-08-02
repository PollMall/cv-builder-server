import { db } from '../firebase';
import { Cv, CvRequest, Education, User, WorkExperience } from './types';
import { v4 as uuidv4 } from 'uuid';
import { updatePopularity } from './skill';
import { getDifference } from './utils';

const assignIds = (field: Education[] | WorkExperience[] | undefined) => {
  return field?.map((el) => (el.id ? el : { ...el, id: uuidv4() }));
};

const addCv = async (uuid: string, cv: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;

  const parsedCv = JSON.parse(cv) as CvRequest;
  const currentTime = Date.now().toString();
  const savedCv = {
    ...parsedCv,
    id: uuidv4(),
    educations: assignIds(parsedCv.educations),
    workExperiences: assignIds(parsedCv.workExperiences),
    feedback: false,
    createdAt: currentTime,
    updatedAt: currentTime,
    score: Math.round(Math.random() * 101),
  } as Cv;

  cvs.push(savedCv);
  await docRef.update({ cvs });

  //update popularity for hard/soft skills
  await updatePopularity(savedCv.field, [], savedCv.hardSkills, 'hardSkills');
  await updatePopularity(savedCv.field, [], savedCv.softSkills, 'softSkills');
  return savedCv;
};

const deleteCv = async (uuid: string, cvId: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  let removedCv: Cv;
  const result = cvs.filter((c) => {
    if (c.id !== cvId) return true;
    else {
      removedCv = c;
      return false;
    }
  });
  await docRef.update({ cvs: result });

  //update popularity for hard/soft skills
  await updatePopularity(removedCv.field, removedCv.hardSkills, [], 'hardSkills');
  await updatePopularity(removedCv.field, removedCv.softSkills, [], 'softSkills');
  return removedCv;
};

const updateCv = async (uuid: string, newCv: string) => {
  const parsedNewCv = JSON.parse(newCv) as Cv;
  const savedCv = {
    ...parsedNewCv,
    educations: assignIds(parsedNewCv.educations),
    workExperiences: assignIds(parsedNewCv.workExperiences),
    updatedAt: Date.now().toString(),
    score: Math.round(Math.random() * 101),
  } as Cv;

  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  let prevSavedCv: Cv;
  const resultCvs = cvs.reduce((arr, c) => {
    if (c.id === savedCv.id) {
      console.log('here');
      prevSavedCv = c;
      return arr.concat(savedCv);
    }
    return arr.concat(c);
  }, [] as Cv[]);
  if (!prevSavedCv) {
    throw new Error('There is no CV with the given id');
  }
  await docRef.update({ cvs: resultCvs });

  //update popularity for hard/soft skills
  await updatePopularity(
    savedCv.field,
    getDifference(prevSavedCv.hardSkills, savedCv.hardSkills),
    getDifference(savedCv.hardSkills, prevSavedCv.hardSkills),
    'hardSkills',
  );
  await updatePopularity(
    savedCv.field,
    getDifference(prevSavedCv.softSkills, savedCv.softSkills),
    getDifference(savedCv.softSkills, prevSavedCv.softSkills),
    'softSkills',
  );
  return savedCv;
};

const readCv = async (uuid: string, cvId: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  return cvs.find((c) => c.id === cvId);
};

const readAllCvs = async (uuid: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  return cvs;
};

const readBestNCvs = async (uuid: string, noOfCvs: number) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  return cvs.sort((a, b) => b.score - a.score).slice(0, noOfCvs);
};

export { addCv, deleteCv, updateCv, readCv, readAllCvs, readBestNCvs };
