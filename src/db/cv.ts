import { bucket, db } from '../firebase';
import { Cv, CvRequest, Education, Templates, User, WorkExperience, Project } from './types';
import { v4 as uuidv4 } from 'uuid';
import { updatePopularity } from './skill';
import { getDifference } from './utils';
import { getFilePDFFromTemplate } from './template';
import { validateCv, validateCvRequest } from './validation';
import { descSortExperienceByStartAt } from './utils';

const assignIds = (field: Education[] | WorkExperience[] | Project[] | undefined) => {
  return field?.map((el) => (el.id ? el : { ...el, id: uuidv4() }));
};

const addCv = async (uuid: string, cv: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;

  const parsedCv = JSON.parse(cv) as CvRequest;

  // validate CV
  await validateCvRequest(parsedCv);

  const currentTime = Date.now().toString();
  const savedCv = {
    ...parsedCv,
    id: uuidv4(),
    educations: assignIds(parsedCv.educations).sort(descSortExperienceByStartAt),
    workExperiences: assignIds(parsedCv.workExperiences).sort(descSortExperienceByStartAt),
    projects: assignIds(parsedCv.projects),
    feedback: false,
    createdAt: currentTime,
    updatedAt: currentTime,
    score: computeScore(parsedCv as Cv),
    template: Templates.CLASSY,
  } as Cv;

  // upload CV to Firebase Storage
  await uploadCVToStorage(uuid, savedCv);

  // get download link
  const downloadLink = await getPDFDownloadLink(uuid, savedCv.id);
  savedCv.downloadLink = downloadLink;

  //save cv in Firestore
  cvs.push(savedCv);
  await docRef.update({ cvs });

  // update popularity for skills
  await updatePopularity(savedCv.field, [], savedCv.hardSkills, 'hardSkills');
  await updatePopularity(savedCv.field, [], savedCv.softSkills, 'softSkills');
  await updatePopularity(savedCv.field, [], savedCv.otherTools, 'otherTools');

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

  // update popularity for skills
  await updatePopularity(removedCv.field, removedCv.hardSkills, [], 'hardSkills');
  await updatePopularity(removedCv.field, removedCv.softSkills, [], 'softSkills');
  await updatePopularity(removedCv.field, removedCv.otherTools, [], 'otherTools');

  // remove CV from Firebase Storage
  try {
    await deleteCVFromStorage(uuid, cvId);
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
};

const updateCv = async (uuid: string, newCv: string) => {
  const parsedNewCv = JSON.parse(newCv) as Cv;

  // validate CV
  await validateCv(parsedNewCv);

  const savedCv = {
    ...parsedNewCv,
    educations: assignIds(parsedNewCv.educations).sort(descSortExperienceByStartAt),
    workExperiences: assignIds(parsedNewCv.workExperiences).sort(descSortExperienceByStartAt),
    projects: assignIds(parsedNewCv.projects),
    updatedAt: Date.now().toString(),
    score: computeScore(parsedNewCv as Cv),
  } as Cv;

  // upload CV to Firebase Storage
  await uploadCVToStorage(uuid, savedCv);

  // get download link
  const downloadLink = await getPDFDownloadLink(uuid, savedCv.id);
  savedCv.downloadLink = downloadLink;

  // update cv in firestore
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  let prevSavedCv: Cv;
  const resultCvs = cvs.reduce((arr, c) => {
    if (c.id === savedCv.id) {
      prevSavedCv = c;
      return arr.concat(savedCv);
    }
    return arr.concat(c);
  }, [] as Cv[]);
  if (!prevSavedCv) {
    throw new Error('There is no CV with the given id');
  }
  await docRef.update({ cvs: resultCvs });

  // update popularity for skills
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
  await updatePopularity(
    savedCv.field,
    getDifference(prevSavedCv.otherTools, savedCv.otherTools),
    getDifference(savedCv.otherTools, prevSavedCv.otherTools),
    'otherTools',
  );

  return savedCv;
};

const readCv = async (uuid: string, cvId: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  return { ...cvs.find((c) => c.id === cvId), downloadLink: getPDFDownloadLink(uuid, cvId) };
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

/**
 * @param uid the uid for which the CV belongs to
 * @param cv the CV that will be uploaded
 */
const uploadCVToStorage = async (uid: string, cv: Cv) => {
  if (!cv?.id) {
    throw new Error('Could not upload to Storage. CV must have an id');
  }
  const pdfFile = await getFilePDFFromTemplate(cv);
  await bucket.upload(pdfFile, { destination: `${uid}/${cv.id}.pdf` });
  console.log('upload to storage successfully');
};

const getPDFDownloadLink = async (uid: string, cvId: string) => {
  const file = bucket.file(`${uid}/${cvId}.pdf`);
  const res = await file.getSignedUrl({ action: 'read', expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
  return res[0];
};

const deleteCVFromStorage = async (uid: string, cvId: string) => {
  if (!cvId) {
    throw new Error('Could not delete from Storage. CV id was not provided');
  }
  await bucket.file(`${uid}/${cvId}.pdf`).delete();
  console.log('delete from storage successfully');
};

/**
 *
 * @param cv the cv that gets analyzed in order to compute the score
 * @returns the score (a number between 0 and 100)
 */

const computeScore = (cv: Cv): number => {
  const weights = {
    personalInfo: 8,
    languages: 8,
    hardSkills: 15,
    softSkills: 15,
    otherTools: 12,
    educations: 12,
    workExperiences: 15,
    projects: 15,
  };
  const scores = {
    personalInfo: 0,
    locationInfo: 0,
    languages: 0,
    hardSkills: 0,
    softSkills: 0,
    otherTools: 0,
    educations: 0,
    workExperiences: 0,
    projects: 0,
  };
  const { personalInfo, languages, hardSkills, softSkills, otherTools, educations, workExperiences, projects } = cv;

  // check for every field
  if (personalInfo) {
    scores.personalInfo = getScoreFromObject(personalInfo);
  }
  if (languages) {
    scores.languages = getScoreFromArray(languages, 2);
  }
  if (hardSkills) {
    scores.hardSkills = getScoreFromArray(hardSkills, 4);
  }
  if (softSkills) {
    scores.softSkills = getScoreFromArray(softSkills, 4);
  }
  if (otherTools) {
    scores.otherTools = getScoreFromArray(otherTools, 2);
  }
  if (educations) {
    scores.educations = getScoreFromArray(educations);
  }
  if (workExperiences) {
    scores.workExperiences = getScoreFromArray(workExperiences);
  }
  if (projects) {
    scores.projects = getScoreFromArray(projects);
  }

  return Math.floor(weightedAvg(weights, scores) * 10);
};

/**
 * Computes the weighted average based on given elements and their weights (elements and weights must be objects with the same key names)
 * @param weights weights used for average (object)
 * @param scores the scores that have weights (object)
 * @returns the weighted average
 */
const weightedAvg = (weights: Record<string, any>, scores: Record<string, any>): number => {
  let avg = 0;
  let sum = 0;
  for (const key in weights) {
    avg += weights[key] * scores[key];
    sum += weights[key];
  }
  return avg / sum;
};

/**
 * Receives an object and returns the average (for every defined value for a key the grade is 10, otherwise 0)
 * @param obj any object
 * @returns the average for the keys that are defined
 */
const getScoreFromObject = (obj: Record<string, any>): number => {
  if (!obj || Object.keys(obj).length === 0) {
    return 0;
  }
  let avg = 0;
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      avg += getScoreFromArray(obj[key]);
    } else {
      if (obj[key]) {
        avg += 10;
      }
    }
  }
  return avg / Object.keys(obj).length;
};

/**
 * Receives an array and returns the average
 * @param arr any array
 * @returns the average for the elements that are defined
 */
const getScoreFromArray = (arr: any[], minNoOfElements = 1): number => {
  const scorePerUnit = 10 / minNoOfElements; // score per unit
  const definedItems: [] = arr.reduce((newArr, el) => (el ? newArr.concat(el) : newArr), []); // defined items withing the array
  const length = definedItems.length > minNoOfElements ? minNoOfElements : definedItems.length; // truncate the maximum length
  return scorePerUnit * length;
};

export { addCv, deleteCv, updateCv, readCv, readAllCvs, readBestNCvs, uploadCVToStorage };
