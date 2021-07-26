import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { readMockUsers } from './db/mock';
import { registerUser } from './db/user';
import { addCv, deleteCv, updateCv, readCv, readAllCvs } from './db/cv';
import { resolve } from './utils';
import { Cv } from './db/types';

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
    updateCv: async (_, { uuid, cvId, newCv }) => {
      return resolve(updateCv, uuid, cvId, newCv);
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
    const cv: Cv = {
      id: 'id1234',
      title: 'this is my cv',
      field: 'Computer Science',
      educations: [],
      workExperiences: [
        {
          id: 'id1234',
          name: 'Modus Create',
          description: 'Awesome',
          location: 'Cluj-Napoca, Romania',
          startAt: 0,
          endAt: 0,
        },
      ],
    };
    console.log(JSON.stringify(cv));
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.log(err));
