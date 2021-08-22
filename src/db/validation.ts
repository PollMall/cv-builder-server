import * as yup from 'yup';
import { Cv, CvRequest, Templates } from './types';

const PersonalInfoSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Email not valid').required('Email is required'),
  phone: yup.string().notRequired(),
  about: yup.string().notRequired(),
});
const LocationInfoSchema = yup.object({
  address: yup.string().required('Address is required'),
  websites: yup.array().of(yup.string().required('Website cannot be empty')),
});
const EducationSchema = yup.object({
  id: yup.string().uuid().notRequired(),
  name: yup.string().required('Education name is required'),
  description: yup.string().notRequired(),
  location: yup.string().notRequired(),
  startAt: yup.string().strict().required('Education start date is required'),
  endAt: yup.string().strict(),
});
const WorkExperienceSchema = yup.object({
  id: yup.string().uuid().notRequired(),
  name: yup.string().required('Work experience name is required'),
  description: yup.string().notRequired(),
  location: yup.string().notRequired(),
  startAt: yup.string().strict().required('Work experience start date is required'),
  endAt: yup.string().strict(),
});
const HardSkillSchema = yup.object({
  name: yup.string().strict().required('Hard skill name is required'),
  rating: yup.number().strict().required('Hard skill rating is required'),
});
const SoftSkillSchema = yup.object({
  name: yup.string().strict().required('Soft skill name is required'),
  rating: yup.number().strict().required('Soft skill rating is required'),
});
const CvSchema = yup.object({
  id: yup.string().uuid('ID not valid').required('ID is required'),
  title: yup.string().required('Title is required'),
  field: yup.string().required('Field is required'),
  educations: yup.array().of(EducationSchema).notRequired(),
  workExperiences: yup.array().of(WorkExperienceSchema).notRequired(),
  feedback: yup.boolean().strict().notRequired(),
  hardSkills: yup.array().of(HardSkillSchema).notRequired(),
  softSkills: yup.array().of(SoftSkillSchema).notRequired(),
  languages: yup.array().of(yup.string().required('Language cannot be empty')).notRequired(),
  locationInfo: LocationInfoSchema,
  personalInfo: PersonalInfoSchema,
  createdAt: yup.string().strict().required('Create date required'),
  updatedAt: yup.string().strict().required('Update date required'),
  score: yup.number().strict().required('Score is required'),
  downloadLink: yup.string().strict().notRequired(),
  template: yup.string().oneOf(Object.keys(Templates), 'Template does not exist').required('Template is required'),
});
const CvRequestSchema = yup.object({
  title: yup.string().required('Title is required'),
  field: yup.string().required('Field is required'),
  educations: yup.array().of(EducationSchema).notRequired(),
  workExperiences: yup.array().of(WorkExperienceSchema).notRequired(),
  hardSkills: yup.array().of(HardSkillSchema).notRequired(),
  softSkills: yup.array().of(SoftSkillSchema).notRequired(),
  languages: yup.array().of(yup.string().required('Language cannot be empty')).notRequired(),
  locationInfo: LocationInfoSchema,
  personalInfo: PersonalInfoSchema,
});

const validateCv = (cv: Cv) => CvSchema.validate(cv);

const validateCvRequest = (cvRequest: CvRequest) => CvRequestSchema.validate(cvRequest);

export { validateCv, validateCvRequest };
