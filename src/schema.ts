import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    uid: String
    displayName: String
    credentials: Credentials
    cvs: [Cv]
  }

  type Credentials {
    idToken: String
    refreshToken: String
    expiresIn: Int
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
    createdAt: String
    updatedAt: String
    score: Int
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
    name: String
    popularity: Int
  }

  type Query {
    users: [User]
    cvs(uid: String!): [Cv]
    cv(uid: String!, cvId: String!): Cv
    bestCvs(uid: String!, noOfCvs: Int!): [Cv]
    recommendSkills(field: String!, typeOfSkills: String!): [FieldSkill]
  }

  type Mutation {
    loginUser(email: String!, password: String!): User
    signOutUser(uid: String!): Boolean
    registerUser(email: String!, password: String!, fullName: String!): User
    addCv(uid: String!, cv: String!): Cv
    deleteCv(uid: String!, cvId: String!): Cv
    updateCv(uid: String!, newCv: String!): Cv
  }
`;

export { typeDefs };
