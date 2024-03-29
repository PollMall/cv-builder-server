import { readMockUsers } from './db/mock';
import { loginUser, refreshTokenUser, registerUserV2, signOutUser } from './db/user';
import { addCv, deleteCv, updateCv, readCv, readAllCvs, readBestNCvs } from './db/cv';
import { resolve, resolvePrivate } from './utils';
import { getSkills, recommendSkills } from './db/skill';
import { getFields } from './db/field';
import { getBase64PDFFromTemplate } from './db/template';

export const resolvers = {
  Query: {
    users: async () => {
      return resolve(readMockUsers);
    },
    cvs: async (_, { idToken, uid }) => {
      return resolvePrivate(readAllCvs, idToken, uid);
    },
    cv: async (_, { uid, cvId }) => {
      return resolve(readCv, uid, cvId);
    },
    bestCvs: async (_, { uid, noOfCvs }) => {
      return resolve(readBestNCvs, uid, noOfCvs);
    },
    recommendSkills: async (_, { field, typeOfSkills }) => {
      return resolve(recommendSkills, field, typeOfSkills);
    },
    skills: async (_, { field, typeOfSkills }) => {
      return resolve(getSkills, field, typeOfSkills);
    },
    fields: async () => {
      return resolve(getFields);
    },
    getPDF: async (_, { cv, template }) => {
      return resolve(getBase64PDFFromTemplate, cv, template);
    },
  },
  Mutation: {
    loginUser: async (_, { email, password }) => {
      return resolve(loginUser, email, password);
    },
    signOutUser: async (_, { uid }) => {
      return resolve(signOutUser, uid);
    },
    registerUser: async (_, { email, password, fullName }) => {
      return resolve(registerUserV2, email, password, fullName);
    },
    addCv: async (_, { uid, cv }) => {
      return resolve(addCv, uid, cv);
    },
    deleteCv: async (_, { uid, cvId }) => {
      return resolve(deleteCv, uid, cvId);
    },
    updateCv: async (_, { uid, newCv }) => {
      return resolve(updateCv, uid, newCv);
    },
    refreshTokenUser: async (_, { refreshToken }) => {
      return resolve(refreshTokenUser, refreshToken);
    },
  },
};
