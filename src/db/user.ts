import { db, auth } from '../firebase';
import { User } from './types';
import API_KEY from '../apiKey.json';
import fetch from 'node-fetch';

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

// const verifyUser = async (idToken: string) => {
//   try {
//     await auth.verifyIdToken(idToken);
//   } catch (err) {
//     throw new Error('User unauthorized');
//   }
// };

const readUser = async (uuid: string) => {
  const docRef = await db.collection('users').doc(uuid).get();
  return docRef.data();
};

const registerUser = async (uuid: string) => {
  const newUser: User = { uuid, cvs: [] };
  await db.collection('users').doc(uuid).set(newUser);
  return newUser;
};

const registerUserV2 = async (email: string, password: string, fullName: string) => {
  const {
    uid,
    email: emailResponse,
    passwordHash,
    displayName,
  } = await auth.createUser({ email, password, displayName: fullName });
  return { uid, emailResponse, passwordHash, displayName };
};

const loginUser = async (email: string, password: string) => {
  const { displayName, error, ...rest } = await (
    await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  ).json();
  console.log({ ...rest });
  if (error) {
    throw new Error(error.message);
  }
  return { email, displayName };
};

export { readUser, registerUser, registerUserV2, loginUser };
