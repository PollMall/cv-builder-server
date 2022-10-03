import { Cv } from '../types';
import { renderConditionally, generateMarkdownFromText } from './helper';

const compact = (cv: Cv) => {
  const { personalInfo, locationInfo, educations, workExperiences, hardSkills, softSkills, languages } = cv;

  return `<!DOCTYPE html>
  <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
      <meta charset="utf-8" />
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          font-size: 13px;
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
          -webkit-border-radius: 5px;
          border-radius: 5px;
          overflow: hidden;
        }
        .header {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 20px;
          background-color: rgb(7, 7, 7);
        }
        .fullName {
          font-weight: 700;
          font-size: 25px;
          color: white;
        }
        .content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
        }
        .main-content {
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          flex-direction: column;
          width: 66%;
          padding: 20px;
        }
        .side-content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          flex-direction: column;
          width: 33%;
          padding: 20px;
          background-color: #f1f0ee;
        }
        .field:nth-child(1n + 2) {
          margin-top: 16px;
        }
        .fieldTitle {
          font-size: 20px;
          font-weight: 700;
          color: rgb(7, 7, 7);
        }
        .fieldContent > *:nth-child(1n + 2) {
          margin-top: 2px;
        }
        .fieldContentTitle {
          font-weight: 700;
          font-size: 15px;
        }
        .fieldContentTitle:nth-child(1n + 2) {
          margin-top: 10px;
        }
        .divider {
          display: block;
          width: 100%;
          height: 1px;
          margin: 4px auto 15px;
          background-color: rgb(192, 192, 192);
        }
        .experience {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
        }
        .experience:nth-child(2n) {
          margin-top: 10px;
        }
        .experience-info > *:nth-child(2n) {
          margin: 5px 0;
        }
        .experience-name {
          font-size: 20px;
        }
        .experience-location {
          font-style: italic;
        }
        .experience-period {
          width: 30%;
          font-weight: 700;
          font-size: 12px;
        }
        .experience-endAt {
          display: block;
          margin-top: 5px;
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
          width: 50%;
          overflow-wrap: break-word;
        }
        .skill-rating {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: space-between;
          -webkit-justify-content: space-between;
          justify-content: space-between;
          width: 60px;
        }
        .skill-rating-fill {
          width: 10px;
          height: 10px;
          -webkit-border-radius: 50%;
          border-radius: 50%;
          background-color: rgb(7, 7, 7);
        }
        .skill-rating-blank {
          width: 10px;
          height: 10px;
          -webkit-border-radius: 50%;
          border-radius: 50%;
          background-color: rgb(173, 173, 173);
        }
      </style>
    </head>
    <body>
      <div class="document">
        <div class="header">
          <div class="fullName">${personalInfo?.fullName}</div>
        </div>
  
        <div class="content">
          <div class="main-content">
            ${renderConditionally(
              personalInfo?.about,
              `<div class="about">${generateMarkdownFromText(personalInfo?.about)}</div>`,
            )}
            ${renderConditionally(
              workExperiences?.length,
              `
                <div class="field">
                  <div class="fieldTitle">Experience</div>
                  <div class="divider"></div>
                  <div class="fieldContent experiences">
                    <!-- map workExperiences -->
                    ${workExperiences?.reduce(
                      (html, we) =>
                        html +
                        `<div class="experience">
                          <div class="experience-period">
                            <span class="experience-startAt">${
                              we.startAt ? new Date(parseInt(we.startAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                            }</span>
                            -
                            <span class="experience-endAt">${
                              we.endAt ? new Date(parseInt(we.endAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                            }</span>
                          </div>
                          <div class="experience-info">
                            <div class="experience-name">${we?.name}</div>
                            <div class="experience-location">${we?.location}</div>
                            <div class="experience-description">${generateMarkdownFromText(we?.description)}</div>
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
              educations?.length,
              `
                <div class="field">
                  <div class="fieldTitle">Education</div>
                  <div class="divider"></div>
                  <div class="fieldContent experiences">
                    <!-- map workExperiences -->
                    ${educations?.reduce(
                      (html, edu) =>
                        html +
                        `<div class="experience">
                          <div class="experience-period">
                            <span class="experience-startAt">${
                              edu.startAt ? new Date(parseInt(edu.startAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                            }</span>
                            -
                            <span class="experience-endAt">${
                              edu.endAt ? new Date(parseInt(edu.endAt, 10)).toLocaleDateString('en-US') : 'PRESENT'
                            }</span>
                          </div>
                          <div class="experience-info">
                            <div class="experience-name">${edu.name}</div>
                            <div class="experience-location">${edu?.location}</div>
                            <div class="experience-description">${generateMarkdownFromText(edu?.description)}</div>
                          </div>
                        </div>
                        `,
                      '',
                    )}
                  </div>
                </div>
              `,
            )}
          </div>
  
          <div class="side-content">
            <div class="field">
              <div class="fieldTitle">Personal Info</div>
              <div class="divider"></div>
              <div class="fieldContent contact">
                <div class="fieldContentTitle">E-mail</div>
                <div>${personalInfo?.email}</div>
                <div class="fieldContentTitle">Phone</div>
                <div>${personalInfo?.phone}</div>
                <div class="fieldContentTitle">Address</div>
                <div>${locationInfo?.address}</div>
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
                <div class="fieldTitle">Hard Skills</div>
                <div class="divider"></div>
                <div class="fieldContent skills">
                  <!-- map hardSkills -->
                  ${hardSkills?.reduce(
                    (html, hs) =>
                      html +
                      `
                      <div class="skill">
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
              softSkills?.length,
              `
              <div class="field">
                <div class="fieldTitle">Soft Skills</div>
                <div class="divider"></div>
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
              <div class="divider"></div>
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

export { compact };
