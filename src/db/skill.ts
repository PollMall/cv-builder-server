import { db } from '../firebase';
import { HardSkill, SoftSkill, OtherTools } from './types';

interface FieldSkill {
  name: string;
  popularity: number;
}

type TypeOfSkill = (HardSkill | SoftSkill | OtherTools)[];

type TypeOfSkillName = 'hardSkills' | 'softSkills' | 'otherTools';

const flatCvSkills = (skills: TypeOfSkill) => {
  return skills?.map((s) => s.name);
};

/**
 * This method should update popularity of every skill there is currently being used by any user
 * @param field the field that hardSkills/softSkills/otherTools are related to
 * @param mustDeleteSkills skills that are in db but not in the update cv received from client
 * @param mustAddSkills skills that are in the updated cv sent from client but not in db
 * @param typeOfSkills a string representing the subcollection name (it must be either 'hardSkills', 'softSkills' or 'otherTools')
 */

const updatePopularity = async (
  field: string,
  mustDeleteSkills: TypeOfSkill,
  mustAddSkills: TypeOfSkill,
  typeOfSkills: TypeOfSkillName,
) => {
  // get docs and collections ref
  const docRef = db.collection('fields').doc(field);
  const skillsCol = docRef.collection(typeOfSkills);

  // get current hard/soft skills from db (related to field)
  const allFieldSkills = [] as FieldSkill[];
  (await skillsCol.get())?.forEach((doc) => allFieldSkills.push({ ...doc.data(), name: doc.id } as FieldSkill));

  // flat the skills from the updated cv
  const flatMustDeleteSkills = flatCvSkills(mustDeleteSkills);
  const flatMustAddSkills = flatCvSkills(mustAddSkills);

  // update popularity locally
  flatMustDeleteSkills?.forEach((skill) => {
    const idx = allFieldSkills?.findIndex((el) => el.name === skill);
    if (allFieldSkills[idx].popularity) {
      allFieldSkills[idx].popularity -= 1;
    }
  });
  flatMustAddSkills?.forEach((skill) => {
    const idx = allFieldSkills ? allFieldSkills.findIndex((el) => el.name === skill) : -1;
    if (idx !== -1) {
      allFieldSkills[idx].popularity += 1;
    } else {
      allFieldSkills.push({ name: skill, popularity: 1 } as FieldSkill);
    }
  });

  //update field skills from db
  allFieldSkills?.forEach((skill) => {
    skillsCol.doc(skill.name).set({ popularity: skill.popularity });
  });
};

/**
 * This method returns the most 3 popular skills for a given field
 * @param field the field for providing the related skills
 * @param typeOfSkills a string representing the subcollection name (it must be either 'hardSkills', 'softSkills' or 'otherTools')
 */

const recommendSkills = async (field: string, typeOfSkills: TypeOfSkillName) => {
  const skillsCol = db.collection('fields').doc(field).collection(typeOfSkills);
  const mostPopularSkillsDocs = await skillsCol.orderBy('popularity', 'desc').limit(3).get();
  const mostPopularSkills: FieldSkill[] = [];
  mostPopularSkillsDocs.docs.forEach((doc) => mostPopularSkills.push({ ...doc.data(), name: doc.id } as FieldSkill));
  return mostPopularSkills;
};

const getSkills = async (field: string, typeOfSkills: TypeOfSkillName) => {
  const skillsCol = db.collection('fields').doc(field).collection(typeOfSkills);
  const skills: FieldSkill[] = [];
  (await skillsCol.get()).forEach((doc) => skills.push({ ...doc.data(), name: doc.id } as FieldSkill));
  return skills;
};

export { updatePopularity, recommendSkills, getSkills };
