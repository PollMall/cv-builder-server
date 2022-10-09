export type User = {
  uid: string;
  displayName: string;
  credentials?: Credentials;
  cvs: Cv[];
};

export type Credentials = {
  idToken: string;
  refreshToken: string;
  expiresIn: number;
};

export enum Templates {
  NORMAL = 'NORMAL',
  COMPACT = 'COMPACT',
  FANCY = 'FANCY',
  CLASSY = 'CLASSY',
}

export type PersonalInfo = {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  websites?: string[];
  about?: string;
};

export type Experience = {
  id?: string;
  name: string;
  description: string;
  location: string;
  title?: string;
  startAt: string;
  endAt: string;
};

export type Education = Experience;

export type WorkExperience = Experience;

export type RatableSkill = {
  name: string;
  rating: number;
};

export type UnratableSkill = {
  name: string;
};

export type HardSkill = RatableSkill;

export type SoftSkill = UnratableSkill;

export type OtherTool = UnratableSkill;

export type FieldSkill = {
  popularity: number;
};

export type CvRequest = {
  title: string;
  field: string;
  educations?: Education[];
  workExperiences?: WorkExperience[];
  hardSkills?: HardSkill[];
  softSkills?: SoftSkill[];
  otherTools?: OtherTool[];
  languages?: string[];
  personalInfo?: PersonalInfo;
};

export type Cv = CvRequest & {
  id?: string;
  feedback?: boolean;
  createdAt: string;
  updatedAt: string;
  score: number;
  downloadLink?: string;
  template?: string;
};
