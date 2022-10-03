import type { Cv } from '../types';
import { renderConditionally, generateMarkdownFromText } from './helper';

export const classy = (cv: Cv) => {
  const { personalInfo, locationInfo, educations, workExperiences, hardSkills, softSkills, otherTools, languages } = cv;

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        *,
        *::before,
        *::after {
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
        }
        :root {
          --main-color: #2079c7;
          --text-color-normal: #343434;
          --text-color-grey: #666666;
          --text-color-black: #000;
        }
        body {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 10pt;
          line-height: 1.25em;
          color: var(--text-color-normal);
        }
        ul,
        ol {
          list-style-position: inside;
          padding: 0;
          margin: 0;
        }
        li {
          margin: 2px;
        }
        p {
          margin: 0;
        }
        .document {
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          -webkit-box-shadow: 0 0 4px 1px #ccc;
                  box-shadow: 0 0 4px 1px #ccc;
          overflow: hidden;
        }
        .header {
          padding-bottom: 20px;
        }
        .fullName {
          font-weight: 700;
          font-size: 28pt;
          color: var(--main-color);
        }
        .content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .main-content {
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: 66%;
          padding: 20px;
        }
        .side-content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
              -ms-flex-direction: column;
                  flex-direction: column;
          width: 33%;
          padding: 20px;
          color: var(--text-color-grey);
        }
        .contact {
          color: var(--text-color-normal);
        }
        .contact > *:nth-child(1n + 2) {
          font-weight: 700;
        }
        .websites {
          margin-top: 16px !important;
        }
        .fieldTitle {
          font-size: 12pt;
          font-weight: 700;
          text-transform: uppercase;
          padding: 20px 0;
          color: var(--main-color);
        }
        .fieldContent > *:nth-child(1n + 2) {
          margin-top: 2px;
        }
        .experience {
          color: var(--text-color-grey);
        }
        .experience:nth-child(2n) {
          margin-top: 10px;
        }
        .experience-name {
          font-weight: 700;
          color: var(--text-color-normal);
        }
        .experience-location {
          color: var(--text-color-normal);
        }
        .experience-period {
          margin: 6px 0;
          font-size: 8pt;
          color: var(--text-color-grey);
        }
        .skill {
          width: 100%;
        }
        .skill--newline {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
        }
        .skill-name {
          color: var(--text-color-grey);
          width: 50%;
          overflow-wrap: break-word;
        }
        .skill-rating {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          width: 60px;
        }
        .skill-rating-fill {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--main-color);
        }
        .skill-rating-blank {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ccc;
        }
      </style>
    </head>
    <body>
      <div class="document">
        <div class="content">
          <div class="main-content">
            <div class="header">
              <div class="fullName">${personalInfo?.fullName}</div>
            </div>
  
            ${renderConditionally(
              personalInfo?.about,
              `<div class="about">${generateMarkdownFromText(personalInfo?.about)}</div>`,
            )}
  
            ${renderConditionally(
              workExperiences?.length,
              `
              <div class="field">
                <div class="fieldTitle">Experience</div>
                <div class="fieldContent experiences">
                  <!-- map workExperiences -->
                  ${workExperiences?.reduce(
                    (html, we) =>
                      html +
                      `<div class="experience">
                        <span class="experience-name">${we?.name}</span>,
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
                      </div>
                      `,
                    '',
                  )}
                </div>
              </div>`,
            )}

            ${renderConditionally(
              educations?.length,
              `
              <div class="field">
                <div class="fieldTitle">Education</div>
                <div class="fieldContent experiences">
                  <!-- map educations -->
                  ${educations?.reduce(
                    (html, edu) =>
                      html +
                      `<div class="experience">
                        <span class="experience-name">${edu?.name}</span>,
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
                      </div>
                      `,
                    '',
                  )}
                </div>
              </div>`,
            )}
          </div>
  
          <div class="side-content">
            <div class="field">
              <div class="fieldContent contact">
                <div>${locationInfo?.address}</div>
                <div>${personalInfo?.phone}</div>
                <div>${personalInfo?.email}</div>
                ${renderConditionally(
                  locationInfo?.websites?.length,
                  `<div class="fieldContentTitle">Websites</div>
                    <div class="fieldContent websites">
                      <!-- map websites -->
                      ${locationInfo?.websites?.reduce((html, site) => html + `<div>${site}</div>`, '')}
                    </div>
                  `,
                )}
              </div>
            </div>

            ${renderConditionally(
              hardSkills?.length,
              `
              <div class="field">
                <div class="fieldTitle">Skills</div>
                <div class="fieldContent skills">
                  <!-- map hardSkills -->
                  ${hardSkills?.reduce(
                    (html, hs) =>
                      html +
                      `
                      <div class="skill skill--newline">
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
                      </div>
                      `,
                    '',
                  )}
                </div>
              </div>
              `,
            )}

            ${renderConditionally(
              otherTools?.length,
              `
              <div class="field">
                <div class="fieldTitle">Other Tools</div>
                <div class="fieldContent skills">
                  <!-- map otherTools -->
                  ${otherTools
                    ?.map((ot) => `<span class="skill"><span class="skill-name">${ot.name}</span></span>`)
                    .join(', ')}
                </div>
              </div>
              `,
            )}

            ${renderConditionally(
              softSkills?.length,
              `
              <div class="field">
                <div class="fieldTitle">Interpersonal Skills</div>
                <div class="fieldContent skills">
                  <!-- map softSkills -->
                  ${softSkills?.reduce(
                    (html, ss) =>
                      html +
                      `
                      <div class="skill">
                        <div class="skill-name">${ss.name}</div>
                      </div>
                      `,
                    '',
                  )}
                </div>
              </div>
              `,
            )}
  
            ${renderConditionally(
              languages?.length,
              `
              <div class="field">
              <div class="fieldTitle">Languages</div>
                <div class="fieldContent languages">
                  <!-- map languages -->
                  ${languages?.reduce((html, language) => html + `<div>${language}</div>`, '')}
                </div>
              </div>
              `,
            )}
          </div>
        </div>
      </div>
    </body>
  </html>  
  `;
};
