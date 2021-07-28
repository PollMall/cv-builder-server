import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { readMockUsers } from './db/mock';
import { registerUser } from './db/user';
import { addCv, deleteCv, updateCv, readCv, readAllCvs, readBestNCvs } from './db/cv';
import { resolve } from './utils';
import { Cv, CvRequest } from './db/types';
import { updateSkills } from './db/skill';

const resolvers = {
  Query: {
    users: async () => {
      return resolve(readMockUsers);
    },
    cvs: async (_, { uuid }) => {
      return resolve(readAllCvs, uuid);
    },
    cv: async (_, { uuid, cvId }) => {
      return resolve(readCv, uuid, cvId);
    },
    bestCvs: async (_, { uuid, noOfCvs }) => {
      return resolve(readBestNCvs, uuid, noOfCvs);
    },
  },
  Mutation: {
    registerUser: async (_, { uuid }) => {
      return resolve(registerUser, uuid);
    },
    addCv: async (_, { uuid, cv }) => {
      return resolve(addCv, uuid, cv);
    },
    deleteCv: async (_, { uuid, cvId }) => {
      return resolve(deleteCv, uuid, cvId);
    },
    updateCv: async (_, { uuid, newCv }) => {
      return resolve(updateCv, uuid, newCv);
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
      feedback: false,
      createdAt: '1627332711879',
      updatedAt: '1627332711879',
      score: 22,
    };
    console.log(JSON.stringify(cvRequest));
    console.log(JSON.stringify(cv));

    console.log(updateSkills('Computer Science', cv.hardSkills, cv.softSkills));

    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.log(err));
