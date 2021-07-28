import { db } from './firebase';
import { HardSkill, SoftSkill } from './types';
import { getDifference } from './utils';

interface FieldSkill {
  popularity: number;
}

// const syncArraysHelper = (
//   savedArray: HardSkill[] | SoftSkill[],
//   dbArray: HardSkill[] | SoftSkill[],
//   collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
// ) => {
//   savedArray.forEach((el) => {
//     if (dbArray.indexOf(el) === -1) {
//       collectionRef.doc(el.name).set({ popularity: 1 });
//     }
//   });
// };

const flatCvSkills = (skills: HardSkill[] | SoftSkill[]) => {
  return skills.map((s) => s.name);
};

/**
 * This method should update popularity of every skills there are currently being used by any users
 * @param field the field that hardSkills/softSkills are related to
 * @param hardSkills hardSkills that belongs to the user after the cv update
 * @param softSkills hardSkills that belongs to the user after the cv update
 */

const updatePopularity = async (field: string, hardSkills: HardSkill[], softSkills: SoftSkill[]) => {
  // get docs and collections ref
  const docRef = db.collection('fields').doc(field);
  const hardSkillsCol = docRef.collection('hardSkills');
  const softSkillsCol = docRef.collection('softSkills');

  // get current hard/soft skills from db (related to field)
  const allHardSkillsNames = [];
  (await hardSkillsCol.get()).forEach((doc) => allHardSkillsNames.push(doc.id));
  const allSoftSkillsNames = [];
  (await softSkillsCol.get()).forEach((doc) => allSoftSkillsNames.push(doc.id));

  // flat the hard/soft skills from the updated cv
  const cvHardSkillsNames = flatCvSkills(hardSkills);
  const cvSoftSkillsNames = flatCvSkills(softSkills);

  // merge values
  allHardSkills = mergeArrays(allHardSkills, hardSkills);
  allSoftSkills = mergeArrays(allSoftSkills, softSkills);
};

export { syncSkills };
