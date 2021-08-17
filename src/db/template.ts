import pdf from 'html-pdf';
import { Cv } from './types';
import { compact } from './templates/compact';
import { normal } from './templates/normal';

enum Templates {
  NORMAL = 'NORMAL',
  COMPACT = 'COMPACT',
}

const getHTMLTemplate = (cv: Cv, template: string) => {
  switch (template) {
    case Templates.NORMAL:
      return normal(cv);
    case Templates.COMPACT:
      return compact(cv);
    default:
      throw new Error('Template does not exist');
  }
};

const getBase64PDFFromTemplate = async (cvRequest: string | Cv, template: string) => {
  let cv: Cv;
  if (typeof cvRequest === 'string') {
    cv = JSON.parse(cvRequest) as Cv;
  } else {
    cv = cvRequest;
  }
  const html = getHTMLTemplate(cv, template);
  return new Promise<string>((resolve, reject) => {
    // create a buffer
    pdf.create(html, { format: 'Letter' }).toBuffer((err, buffer) => {
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
  const html = getHTMLTemplate(cv, cv.template);
  return new Promise<string>((resolve, reject) => {
    // create a buffer
    pdf.create(html, { format: 'Letter' }).toFile('./cv_file.pdf', (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(res.filename);
    });
  });
};

export { getBase64PDFFromTemplate, getFilePDFFromTemplate };
