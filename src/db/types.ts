interface User {
  uid: string;
  displayName: string;
  credentials?: Credentials;
  cvs: Cv[];
}

interface Credentials {
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface Cv {
  id: string;
  title: string;
  field: string;
  educations?: Education[];
  workExperiences?: WorkExperience[];
  feedback: boolean;
  hardSkills?: HardSkill[];
  softSkills?: SoftSkill[];
  languages?: Language[];
  locationInfo?: LocationInfo;
  personalInfo?: PersonalInfo;
  createdAt: string;
  updatedAt: string;
  score: number;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  about?: string;
}

interface LocationInfo {
  address?: string;
  websites?: string[];
}

interface Education {
  id?: string;
  name: string;
  description?: string;
  location?: string;
  startAt: string;
  endAt: string;
}

interface WorkExperience {
  id?: string;
  name: string;
  description?: string;
  location?: string;
  startAt: string;
  endAt: string;
}

interface Language {
  name: string;
  rating: number;
}

interface HardSkill {
  name: string;
  rating: number;
}

interface SoftSkill {
  name: string;
  rating: number;
}

interface FieldSkill {
  popularity: number;
}

interface CvRequest {
  title: string;
  field: string;
  educations?: Education[];
  workExperiences?: WorkExperience[];
  hardSkills?: HardSkill[];
  softSkills?: SoftSkill[];
  languages?: Language[];
  locationInfo?: LocationInfo;
  personalInfo?: PersonalInfo;
}

export {
  User,
  Credentials,
  Cv,
  Education,
  WorkExperience,
  Language,
  HardSkill,
  SoftSkill,
  LocationInfo,
  PersonalInfo,
  FieldSkill,
  CvRequest,
};
