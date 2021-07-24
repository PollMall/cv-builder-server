import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addMockUser: User
  }
`;

export { typeDefs };
