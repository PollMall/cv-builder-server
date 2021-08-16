import { Cv } from '../types';
import { style } from './template1';

const renderConditionally = (checkElement: any, contentToRender: string) => (checkElement ? contentToRender : '');

const template1 = (cv: Cv) => {
  const { personalInfo, locationInfo, educations, workExperiences, hardSkills, softSkills, languages } = cv;

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>${style}</style>
    </head>
    <body>
      <div class="document">
        <div class="header">
          <div class="fullName">${personalInfo?.fullName}</div>
          ${renderConditionally(personalInfo?.about, `<div class="about">${personalInfo?.about}</div>`)}
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
                      <span class="experience-location">${we.location}</span>
                      <div class="experience-period">
                        <span class="experience-startAt">${
                          we.startAt ? new Date(parseInt(we.startAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                        -
                        <span class="experience-endAt">${
                          we.endAt ? new Date(parseInt(we.endAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                      </div>
                      <div class="experience-description">• ${we.description}</div>
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
                      <span class="experience-location">${edu.location}</span>
                      <div class="experience-period">
                        <span class="experience-startAt">${
                          edu.startAt ? new Date(parseInt(edu.startAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                        -
                        <span class="experience-endAt">${
                          edu.endAt ? new Date(parseInt(edu.endAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                        }</span>
                      </div>
                      <div class="experience-description">• ${edu.description}</div>
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

export default template1;
