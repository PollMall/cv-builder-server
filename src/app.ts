import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { readMockUsers } from './db/mock';
import { loginUser, refreshTokenUser, registerUserV2, signOutUser } from './db/user';
import { addCv, deleteCv, updateCv, readCv, readAllCvs, readBestNCvs } from './db/cv';
import { resolve, resolvePrivate } from './utils';
import { getSkills, recommendSkills } from './db/skill';
import { getFields } from './db/field';
import { getBase64PDFFromTemplate, getFilePDFFromTemplate } from './db/template';

const resolvers = {
  Query: {
    users: async () => {
      return resolve(readMockUsers);
    },
    cvs: async (_, { idToken, uid }) => {
      return resolvePrivate(readAllCvs, idToken, uid);
    },
    cv: async (_, { uid, cvId }) => {
      return resolve(readCv, uid, cvId);
    },
    bestCvs: async (_, { uid, noOfCvs }) => {
      return resolve(readBestNCvs, uid, noOfCvs);
    },
    recommendSkills: async (_, { field, typeOfSkills }) => {
      return resolve(recommendSkills, field, typeOfSkills);
    },
    skills: async (_, { field, typeOfSkills }) => {
      return resolve(getSkills, field, typeOfSkills);
    },
    fields: async () => {
      return resolve(getFields);
    },
    getPDF: async (_, { cv, template }) => {
      return resolve(getBase64PDFFromTemplate, cv, template);
    },
  },
  Mutation: {
    loginUser: async (_, { email, password }) => {
      return resolve(loginUser, email, password);
    },
    signOutUser: async (_, { uid }) => {
      return resolve(signOutUser, uid);
    },
    registerUser: async (_, { email, password, fullName }) => {
      return resolve(registerUserV2, email, password, fullName);
    },
    addCv: async (_, { uid, cv }) => {
      return resolve(addCv, uid, cv);
    },
    deleteCv: async (_, { uid, cvId }) => {
      return resolve(deleteCv, uid, cvId);
    },
    updateCv: async (_, { uid, newCv }) => {
      return resolve(updateCv, uid, newCv);
    },
    refreshTokenUser: async (_, { refreshToken }) => {
      return resolve(refreshTokenUser, refreshToken);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    getFilePDFFromTemplate(
      '{"__typename":"Cv","id":"ffbd9b83-1f5f-4059-b119-83b60a86d762","title":"my first cv","field":"Computer Science","educations":[{"__typename":"Education","id":"63ac278b-840a-4b51-9ea3-ed893641eb86","name":"UBB","description":"Senior year student","location":"Cluj-Napoca, Romania","startAt":"1538352000000","endAt":""}],"workExperiences":[],"feedback":false,"hardSkills":[{"__typename":"HardSkill","name":"React.js","rating":5},{"__typename":"HardSkill","name":"Node.js","rating":4},{"__typename":"HardSkill","name":"Typescript","rating":4},{"__typename":"HardSkill","name":"GraphQL","rating":4}],"softSkills":[{"__typename":"SoftSkill","name":"Attention to details","rating":5},{"__typename":"SoftSkill","name":"Fast learner","rating":5},{"__typename":"SoftSkill","name":"Time Management","rating":4}],"languages":["romanian","english"],"locationInfo":{"__typename":"LocationInfo","address":"strada Carmen Silva, nr. 8","websites":["https://github.com/PollMall","linkedIn"]},"personalInfo":{"__typename":"PersonalInfo","fullName":"Paul Popa","email":"ppir2643@scs.ubbcluj.ro","phone":"+40773700975","about":"I am a happy coder. Eager to learn. Hire me."},"createdAt":"1629135391291","updatedAt":"1629135391291","score":54,"template":"COMPACT","downloadLink":"https://storage.googleapis.com/cv-builder-4a6bd.appspot.com/yXaE9rvsy6TF21tLfu060nJO8kx2/ffbd9b83-1f5f-4059-b119-83b60a86d762.pdf?GoogleAccessId=firebase-adminsdk-tszt2%40cv-builder-4a6bd.iam.gserviceaccount.com&Expires=1629287779&Signature=E8z%2B6Kb9uTpuX8PDldoJIKLAWsAQkGCjUp%2BcFw4YGK8I6aPJE3rGUFvBkw32Vm76YUm5TCAeHGCeHOVaH%2BESCS2RYLCx%2Fw5iACdh31dm4PEqKZ5Dh%2FfV7uKq7xfCoC7dmy%2F8jpwmKhmN1%2Fph%2Bqp2YQPrJhB%2BvQfAqDMquT20QkVKPCyGk0prGvck0bwx8BNyyfPbWsKlNZqAlMBpc1foYn1aUE%2BLN3ku%2BHBr36LBjWWmDxIx4KQV6AH%2FLPdTz%2BqA1uebFsXjjY8YOg8XdK68Gp1RwI2Dppq3q3j3saGkkpd%2FAYc7xnAYRqte3AY8i7rRolg5JIyg3enaNdM9ntrZOw%3D%3D"}',
    );
  })
  .catch((err) => console.log(err));
