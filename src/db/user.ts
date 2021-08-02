import { db, auth } from '../firebase';
import { Credentials, User } from './types';
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

const readUser = async (uid: string) => {
  const docRef = await db.collection('users').doc(uid).get();
  return docRef.data();
};

const registerUserV2 = async (email: string, password: string, fullName: string) => {
  const { uid } = await auth.createUser({ email, password, displayName: fullName });
  const newUser: User = { uid: uid, displayName: fullName, cvs: [] };
  await db.collection('users').doc(uid).set(newUser);
  return newUser;
};

const signOutUser = async (uid: string) => {
  await auth.revokeRefreshTokens(uid);
  return true;
};

const loginUser = async (email: string, password: string) => {
  const { idToken, localId, refreshToken, expiresIn, displayName, error } = await (
    await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    })
  ).json();
  if (error) {
    throw new Error(error.message);
  }

  const credentials = { idToken, refreshToken, expiresIn } as Credentials;
  const user = { uid: localId, displayName, credentials } as User;
  return user;
};

export { readUser, registerUserV2, loginUser, signOutUser };
