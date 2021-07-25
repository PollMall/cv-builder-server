import { db } from './firebase';
import { User } from './types';

const readUser = async (uuid: string) => {
  const docRef = await db.collection('users').doc(uuid).get();
  return docRef.data();
};

const registerUser = async (uuid: string) => {
  const newUser: User = { uuid, cvs: [] };
  await db.collection('users').doc(uuid).set(newUser);
  return newUser;
};

export { readUser, registerUser };
