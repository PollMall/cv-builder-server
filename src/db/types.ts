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

enum Templates {
  NORMAL = 'NORMAL',
  COMPACT = 'COMPACT',
  FANCY = 'FANCY',
  CLASSY = 'CLASSY',
}

interface Cv {
  id: string;
  title: string;
  field: string;
  educations?: Education[];
  workExperiences?: WorkExperience[];
  feedback?: boolean;
  hardSkills?: HardSkill[];
  softSkills?: SoftSkill[];
  otherTools?: OtherTools[];
  languages?: string[];
  locationInfo?: LocationInfo;
  personalInfo?: PersonalInfo;
  createdAt: string;
  updatedAt: string;
  score: number;
  downloadLink?: string;
  template: string;
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

interface HardSkill {
  name: string;
  rating: number;
}

type OtherTools = {
  name: string;
};

type SoftSkill = {
  name: string;
};

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
  otherTools?: OtherTools[];
  languages?: string[];
  locationInfo?: LocationInfo;
  personalInfo?: PersonalInfo;
}

export {
  User,
  Credentials,
  Cv,
  Education,
  WorkExperience,
  HardSkill,
  SoftSkill,
  OtherTools,
  LocationInfo,
  PersonalInfo,
  FieldSkill,
  CvRequest,
  Templates,
};
