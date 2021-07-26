import { db } from './firebase';
import { Cv, User } from './types';

const addCv = async (uuid: string, cv: string) => {
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  const parsedCv = JSON.parse(cv) as Cv;
  cvs.push(parsedCv);
  await docRef.update({ cvs });
  return parsedCv;
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
  return removedCv;
};

const updateCv = async (uuid: string, cvId: string, newCv: string) => {
  const parsedNewCv = JSON.parse(newCv) as Cv;
  const docRef = db.collection('users').doc(uuid);
  const { cvs } = (await docRef.get()).data() as User;
  const resultCvs = cvs.reduce((arr, c) => {
    if (c.id === cvId) {
      return arr.concat(parsedNewCv);
    }
    return arr.concat(c);
  }, [] as Cv[]);
  await docRef.update({ cvs: resultCvs });
  return parsedNewCv;
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

export { addCv, deleteCv, updateCv, readCv, readAllCvs };
