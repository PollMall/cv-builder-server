interface User {
  uuid: string;
  cvs: Cv[];
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
  languages?: Language[];
  locationInfo?: LocationInfo;
  personalInfo?: PersonalInfo;
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
  id: string;
  name: string;
  description?: string;
  location?: string;
  startAt: number;
  endAt: number;
}

interface WorkExperience {
  id: string;
  name: string;
  description?: string;
  location?: string;
  startAt: number;
  endAt: number;
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

export { User, Cv, Education, WorkExperience, Language, HardSkill, SoftSkill, LocationInfo, PersonalInfo, FieldSkill };
