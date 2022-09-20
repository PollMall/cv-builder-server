import { Cv } from '../types';
import { renderConditionally, generateMarkdownFromText } from './helper';

const normal = (cv: Cv) => {
  const { personalInfo, locationInfo, educations, workExperiences, hardSkills, softSkills, languages } = cv;

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: 'Times New Roman';
          line-height: 1.35em;
        }
        ul, ol {
          list-style-position: inside;
          padding: 0;
          margin: 0;
        }
        p {
          margin: 0;
        }
        li {
          transform: translateX(50%);
        }
        .document {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          width: 100%;
          margin: 0 auto;
          border: 2px solid #494948;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          flex-direction: column;
          background-color: #f1f0ee;
        }
        .header {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          padding: 20px;
          -webkit-justify-content: space-around;
          justify-content: space-around;
        }
        .fullName {
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          flex-grow: 1;
          font-weight: 700;
          font-size: 40px;
          font-style: italic;
        }
        .about {
          width: 250px;
          font-style: italic;
        }
        .content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          flex-direction: column;
          -webkit-justify-content: space-around;
          justify-content: space-around;
          padding: 20px;
        }
        .field {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
        }
        .fieldTitle {
          width: 230px;
          font-size: 27px;
          font-weight: 700;
          font-style: italic;
          color: #b99a46;
        }
        .fieldContent {
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          flex-grow: 1;
        }
        .fieldContent > *:nth-child(1n + 2) {
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          flex-grow: 1;
          margin-top: 5px;
        }
        .divider {
          display: block;
          width: 100%;
          height: 1px;
          margin: 15px auto;
          background-color: #cbcecb;
        }
        .experience-name {
          font-size: 22px;
        }
        .experience-location {
          font-size: 17px;
        }
        .experience-period {
          font-style: italic;
          font-size: 13px;
          margin: 5px 0;
        }
        .experience-description {
        }
        .skills {
        }
        .skill {
          width: 100%;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          justify-content: space-between;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
        }
        .skill-name {
          margin-right: 20px;
        }
        .skill-rating {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          border: 1px solid black;
        }
        .skill-rating-fill {
          width: 30px;
          height: 7px;
          background-color: #b99a46;
        }
        .skill-rating-blank {
          width: 30px;
          height: 7px;
          background-color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="document">
        <div class="header">
          <div class="fullName">${personalInfo?.fullName}</div>
          ${renderConditionally(
            personalInfo?.about,
            `<div class="about">${generateMarkdownFromText(personalInfo?.about)}</div>`,
          )}
        </div>
  
        <div class="content">
          <div class="field">
            <div class="fieldTitle">Contact</div>
            <div class="fieldContent contact">
              <div>${personalInfo?.email}</div>
              <div>${personalInfo?.phone}</div>
              <div>${locationInfo?.address}</div>
              ${renderConditionally(
                locationInfo?.websites?.length,
                `<div class="fieldContent websites">
                  <!-- map websites -->
                  ${locationInfo?.websites?.reduce((html, site) => html + `<div>${site}</div>`, '')}
                </div>`,
              )}
            </div>
          </div>
          ${renderConditionally(
            languages?.length,
            `
            <div class="divider"></div>
            <div class="field">
              <div class="fieldTitle">Languages</div>
              <div class="fieldContent languages">
                <!-- map languages -->
                ${languages?.reduce((html, language) => html + `<div>${language}</div>`, '')}
              </div>
            </div>
            `,
          )}
          ${renderConditionally(
            workExperiences?.length,
            `
            <div class="divider"></div>
            <div class="field">
              <div class="fieldTitle">Work Experience</div>
              <div class="fieldContent experiences">
                <!-- map workExperiences -->
                ${workExperiences?.reduce(
                  (html, we) =>
                    html +
                    `<div class="experience">
                      <span class="experience-name">${we.name}</span>
                      -
                      <span class="experience-location">${we?.location}</span>
                      <div class="experience-period">
                        <span class="experience-startAt">${
                          we.startAt ? new Date(parseInt(we.startAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                        -
                        <span class="experience-endAt">${
                          we.endAt ? new Date(parseInt(we.endAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                      </div>
                      <div class="experience-description">${generateMarkdownFromText(we?.description)}</div>
                    </div>`,
                  '',
                )}
              </div>
            </div>
            `,
          )}
          ${renderConditionally(
            educations?.length,
            `
            <div class="divider"></div>
            <div class="field">
              <div class="fieldTitle">Education</div>
              <div class="fieldContent experiences">
                <!-- map educations -->
                ${educations?.reduce(
                  (html, edu) =>
                    html +
                    `<div class="experience">
                      <span class="experience-name">${edu.name}</span>
                      -
                      <span class="experience-location">${edu?.location}</span>
                      <div class="experience-period">
                        <span class="experience-startAt">${
                          edu.startAt ? new Date(parseInt(edu.startAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                        -
                        <span class="experience-endAt">${
                          edu.endAt ? new Date(parseInt(edu.endAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                      </div>
                      <div class="experience-description">${generateMarkdownFromText(edu?.description)}</div>
                    </div>`,
                  '',
                )}
              </div>
            </div>
            `,
          )}
          ${renderConditionally(
            hardSkills?.length,
            `
            <div class="divider"></div>
            <div class="field">
              <div class="fieldTitle">Hard Skills</div>
              <div class="fieldContent skills">
                <!-- map hardSkills -->
                ${hardSkills?.reduce(
                  (html, hs) =>
                    html +
                    `<div class="skill">
                      <div class="skill-name">${hs.name}</div>
                      <div class="skill-rating">
                        ${[...new Array(hs.rating)].reduce(
                          (html) => html + '<div class="skill-rating-fill"></div>',
                          '',
                        )}
                        ${[...new Array(5 - hs.rating)].reduce(
                          (html) => html + '<div class="skill-rating-blank"></div>',
                          '',
                        )}
                      </div>
                    </div>`,
                  '',
                )}
              </div>
            </div>
            `,
          )}
          ${renderConditionally(
            softSkills?.length,
            `
            <div class="divider"></div>
            <div class="field">
              <div class="fieldTitle">Soft Skills</div>
              <div class="fieldContent skills">
                <!-- map softSkills -->
                ${softSkills?.reduce(
                  (html, ss) =>
                    html +
                    `<div class="skill">
                      <div class="skill-name">${ss.name}</div>
                      <div class="skill-rating">
                        ${[...new Array(ss.rating)].reduce(
                          (html) => html + '<div class="skill-rating-fill"></div>',
                          '',
                        )}
                        ${[...new Array(5 - ss.rating)].reduce(
                          (html) => html + '<div class="skill-rating-blank"></div>',
                          '',
                        )}
                      </div>
                    </div>`,
                  '',
                )}
              </div>
            </div>
            `,
          )}
        </div>
      </div>
    </body>
  </html>
  `;
};

export { normal };
