import { db } from '../firebase';

const getFields = async () => {
  const fields: string[] = [];
  (await db.collection('fields').get()).docs.forEach((doc) => fields.push(doc.id as string));
  return fields;
};

export { getFields };
