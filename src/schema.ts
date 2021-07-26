import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    uuid: String
    cvs: [Cv]
  }

  type Cv {
    id: String
    title: String
    field: String
    educations: [Education]
    workExperiences: [WorkExperience]
    feedback: Boolean
    hardSkills: [HardSkill]
    softSkills: [SoftSkill]
    languages: [Language]
    locationInfo: LocationInfo
    personalInfo: PersonalInfo
  }

  type PersonalInfo {
    fullName: String
    email: String
    phone: String
    about: String
  }

  type LocationInfo {
    address: String
    websites: [String]
  }

  type Education {
    id: String
    name: String
    description: String
    location: String
    startAt: Int
    endAt: Int
  }

  type WorkExperience {
    id: String
    name: String
    description: String
    location: String
    startAt: Int
    endAt: Int
  }

  type Language {
    name: String
    rating: Int
  }

  type HardSkill {
    name: String
    rating: Int
  }

  type SoftSkill {
    name: String
    rating: Int
  }

  type FieldSkill {
    popularity: Int
  }

  type Query {
    users: [User]
    cvs(uuid: String!): [Cv]
    cv(uuid: String!, cvId: String!): Cv
  }

  type Mutation {
    registerUser(uuid: String!): User
    addCv(uuid: String!, cv: String!): Cv
    deleteCv(uuid: String!, cvId: String!): Cv
    updateCv(uuid: String!, cvId: String!, newCv: String!): Cv
  }
`;

export { typeDefs };
