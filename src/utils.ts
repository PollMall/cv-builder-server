import { ApolloError } from 'apollo-server';

const resolve = (cb, ...params) => {
  try {
    return cb(...params);
  } catch (err) {
    throw new ApolloError(err);
  }
};

export { resolve };
