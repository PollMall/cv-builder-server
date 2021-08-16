import pdf from 'html-pdf';
import helper from './templates/helper';
import { Cv } from './types';

const getBase64PDFFromTemplate = async (cvRequest: string | Cv) => {
  let cv: Cv;
  if (typeof cvRequest === 'string') {
    cv = JSON.parse(cvRequest) as Cv;
  } else {
    cv = cvRequest;
  }
  return new Promise<string>((resolve, reject) => {
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

const getFilePDFFromTemplate = async (cvRequest: string | Cv) => {
  let cv: Cv;
  if (typeof cvRequest === 'string') {
    cv = JSON.parse(cvRequest) as Cv;
  } else {
    cv = cvRequest;
  }
  return new Promise<string>((resolve, reject) => {
    // create a buffer
    pdf.create(helper(cv), { format: 'Letter' }).toFile('./cv_file.pdf', (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res.filename);
    });
  });
};

export { getBase64PDFFromTemplate, getFilePDFFromTemplate };
