import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { readMockUsers } from './db/mock';
import { loginUser, refreshTokenUser, registerUserV2, signOutUser } from './db/user';
import { addCv, deleteCv, updateCv, readCv, readAllCvs, readBestNCvs } from './db/cv';
import { resolve, resolvePrivate } from './utils';
import { Cv, CvRequest } from './db/types';
import { recommendSkills } from './db/skill';

const resolvers = {
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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
  .listen()
  .then(({ url }) => {
    const cvRequest: CvRequest = {
      title: 'this is my cv',
      field: 'Computer Science',
      educations: [],
      workExperiences: [
        {
          name: 'Modus Create',
          description: 'Awesome',
          location: 'Cluj-Napoca, Romania',
          startAt: 0,
          endAt: 0,
        },
      ],
      hardSkills: [
        {
          name: 'React.js',
          rating: 5,
        },
        {
          name: 'React Native',
          rating: 4,
        },
      ],
    };
    const cv: Cv = {
      id: '19e0d0d3-04fd-47f5-a2c9-3a8fcf3d2374',
      title: 'this is my cv',
      field: 'Computer Science',
      educations: [],
      workExperiences: [
        {
          name: 'Modus Create',
          description: 'Awesome',
          location: 'Cluj-Napoca, Romania',
          startAt: 0,
          endAt: 0,
        },
      ],
      hardSkills: [
        {
          name: 'React.js',
          rating: 5,
        },
        {
          name: 'React Native',
          rating: 4,
        },
      ],
      feedback: false,
      createdAt: '1627332711879',
      updatedAt: '1627332711879',
      score: 22,
    };
    console.log(JSON.stringify(cvRequest));
    console.log(JSON.stringify(cv));

    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.log(err));
