import pdf from 'html-pdf';
import helper from './templates/helper';
import { Cv } from './types';

const getPDFFromTemplate = async (cvRequest: string) => {
  const cv = JSON.parse(cvRequest) as Cv;
  return new Promise((resolve, reject) => {
    // create a buffer
    pdf.create(helper(cv), { format: 'Letter' }).toBuffer((err, buffer) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(`data:application/pdf;base64,${buffer.toString('base64')}`);
    });
  });
};

export { getPDFFromTemplate };
