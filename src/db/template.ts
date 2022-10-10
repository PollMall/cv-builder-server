import fs from 'fs';
import puppeteer from 'puppeteer';
import { Cv, Templates } from './types';
import { compact, fancy, classy } from './templates';

const savePDFCvPath = './cv_file.pdf';

const getHTMLTemplate = (cv: Cv, template: string = Templates.CLASSY) => {
  switch (template) {
    case Templates.COMPACT:
      return compact(cv);
    case Templates.FANCY:
      return fancy(cv);
    case Templates.CLASSY:
      return classy(cv);
    default:
      throw new Error('Template does not exist');
  }
};

const createPDFFromHTML = async (html: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'letter', printBackground: true });
  await browser.close();
  return pdf;
};

const getBase64PDFFromTemplate = async (cvRequest: string | Cv, template: string) => {
  let cv: Cv;
  if (typeof cvRequest === 'string') {
    cv = JSON.parse(cvRequest) as Cv;
  } else {
    cv = cvRequest;
  }
  const html = getHTMLTemplate(cv, template);
  const bufferPDF = await createPDFFromHTML(html);
  return `data:application/pdf;base64,${bufferPDF.toString('base64')}`;
};

const getFilePDFFromTemplate = async (cvRequest: string | Cv) => {
  let cv: Cv;
  if (typeof cvRequest === 'string') {
    cv = JSON.parse(cvRequest) as Cv;
  } else {
    cv = cvRequest;
  }
  const template = cv.template ? cv.template : Templates.CLASSY;
  const html = getHTMLTemplate(cv, template);
  const bufferPDF = await createPDFFromHTML(html);
  return new Promise<string>((resolve, reject) => {
    // create a buffer
    fs.writeFile(savePDFCvPath, bufferPDF, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(savePDFCvPath);
    });
  });
};

export { getBase64PDFFromTemplate, getFilePDFFromTemplate };
