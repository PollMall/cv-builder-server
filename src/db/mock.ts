import { db } from './firebase';

const writeMockUser = async () => {
  const mockUser = {
    firstName: 'Hulpoi',
    lastName: 'Alexandra',
  };
  const docRef = db.collection('users').doc('ahulpoi');
  await docRef.set(mockUser);
  return mockUser;
};

const readMockUsers = async () => {
  const usersDocs = await db.collection('users').get();
  return usersDocs.docs.map((d) => d.data());
};

export { writeMockUser, readMockUsers };
