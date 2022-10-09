import * as Yup from 'yup';
import { Cv, CvRequest, Templates } from './types';

// Basic info
const titleSchema = Yup.string().required('Title is required').default('');
const fieldSchema = Yup.string().required('Field name is required').default('');
const fullNameSchema = Yup.string().required('Full name is required').default('');
const emailSchema = Yup.string().required('Email address is required').email('Email field is not valid').default('');
const phoneSchema = Yup.string().required('Phone number is required').default('');
const addressSchema = Yup.string().required('Address is required').default('');
const websiteSchema = Yup.string().default('');
const websitesSchema = Yup.array().of(websiteSchema).default([]);
const aboutSchema = Yup.string().default('');
const personalInfoSchema = Yup.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  about: aboutSchema,
  address: addressSchema,
  websites: websitesSchema,
});

// Language info
const languageSchema = Yup.string().default('');
const languagesSchema = Yup.array().of(languageSchema).default([]);

// Skills info
const hardSkillSchema = Yup.object({
  name: Yup.string(),
  rating: Yup.number() as Yup.NumberSchema<number>,
}).default({
  name: '',
  rating: 1,
});
const hardSkillsSchema = Yup.array().of(hardSkillSchema).default([]);

const otherToolSchema = Yup.object({
  name: Yup.string(),
}).default({
  name: '',
});
const otherToolsSchema = Yup.array().of(otherToolSchema).default([]);

const softSkillSchema = Yup.object({
  name: Yup.string(),
}).default({
  name: '',
});
const softSkillsSchema = Yup.array().of(softSkillSchema).default([]);

// Experience info
/**
 * Create a Yup validation object with custom error messages based on @nameOfExperience
 * @param nameOfExperience the name of the experience (e. g: "Education", "Work experience")
 * @returns a Yup validation object
 */
const makeExperienceFieldsValidation = (nameOfExperience: 'Education' | 'Work experience') =>
  Yup.object({
    id: Yup.string().uuid().notRequired(),
    name: Yup.string().required(`${nameOfExperience} name is required`),
    description: Yup.string().notRequired(),
    location: Yup.string().notRequired(),
    title: Yup.string().notRequired(),
    startAt: Yup.string().strict().required(`${nameOfExperience} start date is required`),
    endAt: Yup.string().strict(),
    present: Yup.boolean().notRequired(),
  }).default({
    name: '',
    description: '',
    location: '',
    title: '',
    startAt: '',
    endAt: '',
    present: false,
  });

const educationSchema = makeExperienceFieldsValidation('Education');
const educationsSchema = Yup.array().of(educationSchema).default([]);

const workExperienceSchema = makeExperienceFieldsValidation('Work experience');
const workExperiencesSchema = Yup.array().of(workExperienceSchema).default([]);

const projectSchema = Yup.object({
  id: Yup.string().uuid().notRequired(),
  name: Yup.string().required(`Project name is required`),
  description: Yup.string().notRequired(),
  title: Yup.string().notRequired(),
}).default({
  name: '',
  description: '',
  title: '',
});
const projectsSchema = Yup.array().of(projectSchema).default([]);

// CV info
const cvRequestSchema = Yup.object({
  title: titleSchema,
  field: fieldSchema,
  personalInfo: personalInfoSchema,
  languages: languagesSchema,
  hardSkills: hardSkillsSchema,
  softSkills: softSkillsSchema,
  otherTools: otherToolsSchema,
  educations: educationsSchema,
  workExperiences: workExperiencesSchema,
  projects: projectsSchema,
});

const cvSchema = cvRequestSchema.concat(
  Yup.object({
    id: Yup.string().uuid('ID not valid').required('ID is required'),
    feedback: Yup.boolean().strict().notRequired(),
    createdAt: Yup.string().strict().required('Create date required'),
    updatedAt: Yup.string().strict().required('Update date required'),
    score: Yup.number().strict().required('Score is required'),
    downloadLink: Yup.string().strict().notRequired(),
    template: Yup.string().oneOf(Object.keys(Templates), 'Template does not exist').required('Template is required'),
  }),
);

const validateCv = (cv: Cv) => cvSchema.validate(cv);

const validateCvRequest = (cvRequest: CvRequest) => cvRequestSchema.validate(cvRequest);

export { validateCv, validateCvRequest };
