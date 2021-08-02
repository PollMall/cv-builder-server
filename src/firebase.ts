import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../cv-builder-4a6bd-firebase-adminsdk-tszt2-5f7c26834f.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const auth = admin.auth();

export { db, auth };
