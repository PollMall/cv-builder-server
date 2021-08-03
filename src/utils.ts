import { ApolloError } from 'apollo-server';
import { verifyUser } from './db/user';

const resolve = (cb, ...params) => {
  try {
    return cb(...params);
  } catch (err) {
    throw new ApolloError(err);
  }
};

const resolvePrivate = async (cb, idToken, ...params) => {
  try {
    await verifyUser(idToken);
    return cb(...params);
  } catch (err) {
    throw new ApolloError(err);
  }
};

export { resolve, resolvePrivate };
