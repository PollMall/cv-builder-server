import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../cv-builder-4a6bd-firebase-adminsdk-tszt2-5f7c26834f.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: 'cv-builder-4a6bd.appspot.com',
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const auth = admin.auth();

const bucket = admin.storage().bucket();

export { db, auth, bucket };
