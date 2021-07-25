import { ApolloServer, ApolloError } from 'apollo-server';
import { typeDefs } from './schema';
import { readMockUsers } from './db/mock';
import { registerUser } from './db/user';

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
    registerUser: async (_, { uuid }) => {
      try {
        return registerUser(uuid);
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
