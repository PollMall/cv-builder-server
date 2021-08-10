import { db, auth } from '../firebase';
import { Credentials, User } from './types';
import API_KEY from '../apiKey.json';
import fetch from 'node-fetch';

const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const TOKEN_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

const verifyUser = async (idToken: string) => {
  try {
    await auth.verifyIdToken(idToken, true);
  } catch (err) {
    throw new Error('User unauthorized');
  }
};

const refreshTokenUser = async (refreshToken: string): Promise<Credentials> => {
  const {
    expires_in: expiresIn,
    refresh_token: newRefreshToken,
    id_token: idToken,
    // user_id: uid,
  } = await (
    await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })
  ).json();
  // const user = await auth.getUser(uid);
  // console.log(user);
  return { expiresIn, refreshToken: newRefreshToken, idToken } as Credentials;
};

const readUser = async (uid: string) => {
  const docRef = await db.collection('users').doc(uid).get();
  return docRef.data();
};

const registerUserV2 = async (email: string, password: string, fullName: string) => {
  const { uid } = await auth.createUser({ email, password, displayName: fullName });
  const newUser: User = { uid: uid, displayName: fullName, cvs: [] };
  await db.collection('users').doc(uid).set(newUser);
  const loggedUser = await loginUser(email, password);
  return loggedUser;
};

const signOutUser = async (uid: string) => {
  await auth.revokeRefreshTokens(uid);
  return true;
};

const loginUser = async (email: string, password: string) => {
  const { idToken, localId, refreshToken, expiresIn, displayName, error } = await (
    await fetch(LOGIN_URL, {
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

export { readUser, registerUserV2, loginUser, signOutUser, verifyUser, refreshTokenUser };
