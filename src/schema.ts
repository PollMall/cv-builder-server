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
    otherTools: [OtherTools]
    languages: [String]
    personalInfo: PersonalInfo
    createdAt: String
    updatedAt: String
    score: Int
    downloadLink: String
    template: String
  }

  type PersonalInfo {
    fullName: String
    email: String
    phone: String
    about: String
    address: String
    websites: [String]
  }

  type Education {
    id: String
    name: String
    description: String
    location: String
    startAt: String
    endAt: String
  }

  type WorkExperience {
    id: String
    name: String
    description: String
    location: String
    startAt: String
    endAt: String
  }

  type HardSkill {
    name: String
    rating: Int
  }

  type SoftSkill {
    name: String
  }

  type OtherTools {
    name: String
  }

  type FieldSkill {
    name: String
    popularity: Int
  }

  type Query {
    users: [User]
    cvs(idToken: String!, uid: String!): [Cv]
    cv(uid: String!, cvId: String!): Cv
    bestCvs(uid: String!, noOfCvs: Int!): [Cv]
    recommendSkills(field: String!, typeOfSkills: String!): [FieldSkill]
    skills(field: String!, typeOfSkills: String!): [FieldSkill]
    fields: [String]
    getPDF(cv: String, template: String): String
  }

  type Mutation {
    loginUser(email: String!, password: String!): User
    signOutUser(uid: String!): Boolean
    registerUser(email: String!, password: String!, fullName: String!): User
    addCv(uid: String!, cv: String!): Cv
    deleteCv(uid: String!, cvId: String!): Cv
    updateCv(uid: String!, newCv: String!): Cv
    refreshTokenUser(refreshToken: String!): Credentials
  }
`;

export { typeDefs };
