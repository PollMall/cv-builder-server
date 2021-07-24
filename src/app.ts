import { ApolloServer, ApolloError } from 'apollo-server';
import { typeDefs } from './schema';
import { readMockUsers, writeMockUser } from './db/mock';

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];

// const users = [
//   { firstName: 'Paul', lastName: 'Popa' },
//   { firstName: 'Alexandra', lastName: 'Hulpoi' },
// ];

const resolvers = {
  Query: {
    users: async () => {
      try {
        return readMockUsers();
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
  Mutation: {
    addMockUser: async () => {
      try {
        return writeMockUser();
      } catch (err) {
        throw new ApolloError(err);
      }
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
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.log(err));
