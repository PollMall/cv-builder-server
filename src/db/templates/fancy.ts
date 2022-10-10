import { Cv, Experience } from '../types';
import { renderConditionally, generateMarkdownFromText, fromTimestampToMonthYearFormat } from './helper';

const makeExperienceSVG = (typeOfExperience: 'work' | 'education') => {
  switch (typeOfExperience) {
    case 'work':
      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="16"
          height="16"
          x="0"
          y="0"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
          class="icon"
        >
          <g>
            <g xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M488.727,279.273c-6.982,0-11.636,4.655-11.636,11.636v151.273c0,6.982-4.655,11.636-11.636,11.636H46.545    c-6.982,0-11.636-4.655-11.636-11.636V290.909c0-6.982-4.655-11.636-11.636-11.636s-11.636,4.655-11.636,11.636v151.273    c0,19.782,15.127,34.909,34.909,34.909h418.909c19.782,0,34.909-15.127,34.909-34.909V290.909    C500.364,283.927,495.709,279.273,488.727,279.273z"
                  fill="#000000"
                  data-original="#000000"
                  style=""
                  class=""
                />
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M477.091,116.364H34.909C15.127,116.364,0,131.491,0,151.273v74.473C0,242.036,11.636,256,26.764,259.491l182.691,40.727    v37.236c0,6.982,4.655,11.636,11.636,11.636h69.818c6.982,0,11.636-4.655,11.636-11.636v-37.236l182.691-40.727    C500.364,256,512,242.036,512,225.745v-74.473C512,131.491,496.873,116.364,477.091,116.364z M279.273,325.818h-46.545v-46.545    h46.545V325.818z M488.727,225.745c0,5.818-3.491,10.473-9.309,11.636l-176.873,39.564v-9.309c0-6.982-4.655-11.636-11.636-11.636    h-69.818c-6.982,0-11.636,4.655-11.636,11.636v9.309L32.582,237.382c-5.818-1.164-9.309-5.818-9.309-11.636v-74.473    c0-6.982,4.655-11.636,11.636-11.636h442.182c6.982,0,11.636,4.655,11.636,11.636V225.745z"
                  fill="#000000"
                  data-original="#000000"
                  style=""
                  class=""
                />
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M314.182,34.909H197.818c-19.782,0-34.909,15.127-34.909,34.909v11.636c0,6.982,4.655,11.636,11.636,11.636    s11.636-4.655,11.636-11.636V69.818c0-6.982,4.655-11.636,11.636-11.636h116.364c6.982,0,11.636,4.655,11.636,11.636v11.636    c0,6.982,4.655,11.636,11.636,11.636c6.982,0,11.636-4.655,11.636-11.636V69.818C349.091,50.036,333.964,34.909,314.182,34.909z"
                  fill="#000000"
                  data-original="#000000"
                  style=""
                  class=""
                />
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
            <g xmlns="http://www.w3.org/2000/svg"></g>
          </g>
        </svg>
      `;
    case 'education':
      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="16"
          height="16"
          x="0"
          y="0"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
          class="icon"
        >
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m502.024 156.633c5.987-2.128 9.983-7.797 9.976-14.151-.008-6.354-4.018-12.013-10.009-14.127l-241-85.031c-3.229-1.14-6.752-1.14-9.981 0l-241 85.031c-5.992 2.113-10.002 7.773-10.01 14.127s3.989 12.023 9.976 14.151l95.469 33.94v97.847c0 16.149 16.847 29.806 50.073 40.59 28.961 9.4 64.647 14.577 100.483 14.577s71.521-5.177 100.483-14.577c33.226-10.784 50.073-24.44 50.073-40.59v-97.847l39.417-14.013v135.584c-17.529 6.198-30.125 22.927-30.125 42.552 0 19.624 12.596 36.354 30.125 42.552v57.285c0 8.284 6.716 15 15 15s15-6.716 15-15v-57.285c17.529-6.198 30.125-22.927 30.125-42.552 0-19.624-12.596-36.354-30.125-42.552v-146.25zm-41.051 213.187c-8.34 0-15.125-6.785-15.125-15.125s6.785-15.125 15.125-15.125 15.125 6.785 15.125 15.125-6.785 15.125-15.125 15.125zm-204.973-296.445 196.069 69.179-196.069 69.703-196.069-69.704zm120.556 212.784c-2.875 2.898-13.167 9.839-36.396 16.466-24.781 7.069-54.67 10.962-84.16 10.962s-59.378-3.893-84.16-10.962c-23.229-6.627-33.521-13.567-36.396-16.466v-84.921l115.531 41.072c1.625.578 3.325.867 5.024.867 1.7 0 3.399-.289 5.024-.867l115.531-41.072v84.921z"
              fill="#000000"
              data-original="#000000"
            />
          </g>
        </svg>
      `;
    default:
      '';
  }
};

const makeExperienceHTML = (title: string, experiences: Experience[], typeOfExperience: 'work' | 'education') => `
  <div class="field">
    <div class="fieldTitle-fancy">
      <div class="iconContainer">
        ${makeExperienceSVG(typeOfExperience)}
      </div>
      ${title}
    </div>
    <div class="fieldContent-fancy experiences">
      <!-- map experiences -->
      ${experiences?.reduce(
        (html, exp) =>
          html +
          `
      <div class="experience">
        <div class="experience-period">
          <div class="experience-mark"></div>
          <span class="experience-startAt">${
            exp.startAt ? fromTimestampToMonthYearFormat(exp.startAt, { upperCaseMonthName: true }) : 'PRESENT'
          }</span>
          -
          <span class="experience-endAt">${
            exp.endAt ? fromTimestampToMonthYearFormat(exp.startAt, { upperCaseMonthName: true }) : 'PRESENT'
          }</span>
        </div>
        <div class="experience-info">
          <span class="experience-name">${exp?.name}</span>${renderConditionally(
            exp?.title,
            `<span> - ${exp.title}</span>`,
          )}
          ${renderConditionally(exp?.location, `<div class="experience-location">${exp?.location}</div>`)}
          ${renderConditionally(
            exp?.description,
            `<div class="experience-description">${generateMarkdownFromText(exp?.description)}</div>`,
          )}
        </div>
      </div>
      `,
        '',
      )}
    </div>
  </div>
`;

const fancy = (cv: Cv) => {
  const { personalInfo, educations, workExperiences, projects, hardSkills, softSkills, otherTools, languages } = cv;

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
          font-size: 10pt;
          line-height: 1.25em;
        }
        ul, ol {
          list-style-position: inside;
          padding: 0;
          margin: 0;
        }
        p {
          margin: 0;
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
        .fullName {
          font-weight: 700;
          font-size: 20pt;
          color: white;
        }
        .content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: reverse;
          -webkit-flex-direction: row-reverse;
          flex-direction: row-reverse;
          color: white;
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
          background-color: #404450;
        }
        .side-content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          flex-direction: column;
          width: 30%;
          padding: 16px;
          background-color: #88c9da;
          color: #333;
        }
        .field {
          border: 1px solid #88c9da;
          border-right: transparent;
        }
        .field:nth-child(1n + 2) {
          margin-top: 16px;
        }
        .fieldTitle {
          margin-bottom: 16px;
          font-size: 15px;
          font-weight: 700;
          color: #404450;
        }
        .fieldTitle-fancy {
          position: relative;
          font-size: 15px;
          padding: 5px 24px;
          font-weight: 700;
          color: #404450;
          background-color: #88c9da;
        }
        .fieldContent-fancy {
          padding: 16px;
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
        .contact-info {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
        }
        .websites {
          width: 100%;
        }
        .websites > * {
          word-break: break-all;
          width: 100%;
        }
        .breakable-text {
          width: 80%;
          word-break: break-all;
          margin-bottom: 5px;
        }
        .contact-info:not(:last-child) {
          margin-bottom: 8px;
        }
        .contact-info-icon {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        .languages {
          width: 100%;
        }
        .languages > * {
          word-break: break-all;
          width: 100%;
        }
        .small-mark {
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: white;
          -webkit-border-radius: 50%;
          border-radius: 50%;
          margin-right: 5px;
        }
        .iconContainer {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          position: absolute;
          top: -2px;
          left: -16px;
          padding: 8px;
          background-color: white;
          -webkit-border-radius: 50%;
          border-radius: 50%;
        }
        .icon {
          display: block;
        }
        .experience {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          padding-left: 16px;
        }
        .experience:nth-child(2n) {
          margin-top: 16px;
        }
        .experience-info > *:nth-child(2n) {
          margin: 5px 0;
        }
        .experience-name {
          font-size: 12pt;
        }
        .experience-location {
          font-style: italic;
        }
        .experience-period {
          position: relative;
          width: 30%;
          font-weight: 700;
          font-size: 12px;
        }
        .experience-mark {
          position: absolute;
          top: 2px;
          left: -36px;
          background-color: white;
          width: 8px;
          height: 8px;
          -webkit-border-radius: 50%;
          border-radius: 50%;
        }
        .experience-endAt {
          display: block;
          margin-top: 5px;
        }
        .skills-content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          justify-content: space-between;
        }
        .skills-section {
          width: 25%;
        }
        .skills-section--large {
          width: 40%;
        }
        .skills-title {
          text-align: center;
          margin-bottom: 8px;
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
          word-wrap: break-word;
        }
        .skill-name--full-width {
          width: 100%;
          justify-self: center;
          text-align: center;
        }
        .skill-rating {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: space-evenly;
          -webkit-justify-content: space-evenly;
          justify-content: space-evenly;
          width: 50px;
        }
        .skill-rating-fill {
          width: 10px;
          height: 5px;
          background-color: #88c9da;
        }
        .skill-rating-blank {
          width: 10px;
          height: 5px;
          background-color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="document">
        <div class="content">
          <div class="main-content">
            <div class="fullName">${personalInfo.fullName}</div>

            ${renderConditionally(workExperiences?.length, makeExperienceHTML('Experience', workExperiences, 'work'))}
            
            ${renderConditionally(educations?.length, makeExperienceHTML('Education', educations, 'education'))}

            <div class="field">
              <div class="fieldTitle-fancy">
                <div class="iconContainer">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                    x="0"
                    y="0"
                    viewBox="0 0 512 512" style="enable-background:new 0 0 488.99 488.99;" xml:space="preserve"
                    class="icon"
                  >
                    <g>
                      <g>
                        <g>
                          <path d="M481.241,31.418h-303.03c-4.279,0-7.749,3.469-7.749,7.748v30.993H30.993c-4.279,0-7.749,3.469-7.749,7.748v38.741H7.748
                            c-4.279,0-7.748,3.469-7.748,7.748v309.932c0,12.817,10.427,23.245,23.245,23.245h441.654c0.104,0,0.207-0.002,0.31-0.006
                            c0.178,0.004,0.357,0.006,0.536,0.006c12.817,0,23.245-10.427,23.245-23.245V39.166C488.989,34.887,485.52,31.418,481.241,31.418
                            z M23.245,442.077c-4.273,0-7.748-3.476-7.748-7.748V132.145h426.178l0.824,302.184c0,2.715,0.468,5.324,1.328,7.748H23.245z
                              M473.492,434.329c0,4.273-3.475,7.748-7.748,7.748s-7.748-3.476-7.748-7.769l-0.846-309.932
                            c-0.012-4.271-3.477-7.727-7.749-7.727H38.742V85.655h139.469c4.279,0,7.748-3.469,7.748-7.749V46.915h287.533V434.329z"/>
                          <path d="M209.204,85.655h240.197c4.279,0,7.749-3.469,7.749-7.749c0-4.279-3.469-7.748-7.749-7.748H209.204
                            c-4.279,0-7.748,3.469-7.748,7.748C201.456,82.187,204.925,85.655,209.204,85.655z"/>
                          <path d="M317.681,240.621h-69.735v-54.238c0-4.279-3.469-7.749-7.749-7.749H54.238c-4.279,0-7.748,3.469-7.748,7.749v92.98
                            c0,4.279,3.469,7.749,7.748,7.749h108.477v54.238c0,4.279,3.469,7.748,7.748,7.748h147.218c4.279,0,7.748-3.469,7.748-7.748
                            v-92.98C325.429,244.09,321.96,240.621,317.681,240.621z M61.986,271.614v-77.482h170.463v77.482H61.986z M309.932,333.601
                            H178.211v-46.489h61.986c4.279,0,7.749-3.469,7.749-7.749v-23.245h61.986V333.601z"/>
                          <path d="M209.204,209.627H85.231c-4.279,0-7.749,3.469-7.749,7.749c0,4.28,3.47,7.749,7.749,7.749h123.973
                            c4.279,0,7.749-3.469,7.749-7.749C216.953,213.096,213.484,209.627,209.204,209.627z"/>
                          <path d="M209.204,240.621H85.231c-4.279,0-7.749,3.469-7.749,7.749c0,4.279,3.469,7.749,7.749,7.749h123.973
                            c4.28-0.001,7.749-3.47,7.749-7.749C216.953,244.091,213.484,240.621,209.204,240.621z"/>
                          <path d="M410.66,155.39h-46.49c-4.279,0-7.749,3.469-7.749,7.748c0,4.28,3.469,7.749,7.749,7.749h46.49
                            c4.279,0,7.749-3.469,7.749-7.749C418.409,158.859,414.939,155.39,410.66,155.39z"/>
                          <path d="M410.66,186.384h-46.49c-4.279,0-7.749,3.469-7.749,7.749c0,4.279,3.469,7.749,7.749,7.749h46.49
                            c4.279,0,7.749-3.469,7.749-7.749C418.409,189.853,414.939,186.384,410.66,186.384z"/>
                        </g>
                      </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                  </svg>
                </div>
                Projects
              </div>
              <div class="fieldContent-fancy experiences">
                <!-- map experiences -->
                ${projects?.reduce(
                  (html, proj) =>
                    html +
                    `
                <div class="experience">
                  <div class="experience-info">
                    <div class="experience-name">${proj?.name}</div>
                    <div class="experience-description">${generateMarkdownFromText(proj?.description)}</div>
                  </div>
                </div>
                `,
                  '',
                )}
              </div>
            </div>

            ${renderConditionally(
              hardSkills.length || softSkills.length || otherTools.length,
              `
              <div class="field">
                <div class="fieldTitle-fancy">
                  <div class="iconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns:svgjs="http://svgjs.com/svgjs"
                      version="1.1"
                      width="16"
                      height="16"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                      class="icon"
                    >
                      <g>
                        <g xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="m481.391 335.216c-27.202-27.201-67.294-36.966-103.749-25.745l-36.551-36.552 159.708-159.707c7.223-7.223 11.201-16.827 11.201-27.042s-3.978-19.82-11.201-27.042l-47.927-47.927c-7.223-7.224-16.827-11.201-27.042-11.201-10.216 0-19.819 3.977-27.042 11.201l-159.708 159.708-36.551-36.552c11.221-36.454 1.456-76.547-25.745-103.749-15.053-15.053-34.05-24.981-54.937-28.71-20.4-3.643-41.171-1.167-60.065 7.158-3.02 1.331-5.189 4.066-5.797 7.31-.607 3.243.424 6.578 2.758 8.912l47.709 47.708-33.729 33.728-47.709-47.707c-2.334-2.334-5.671-3.362-8.912-2.758-3.244.607-5.979 2.776-7.309 5.797-8.325 18.895-10.8 39.665-7.159 60.065 3.729 20.887 13.657 39.884 28.711 54.938 27.201 27.2 67.296 36.966 103.749 25.745l36.551 36.551s-91.74 91.74-122.32 122.321c-1.822 1.822-2.421 3.925-2.427 3.945l-43.551 131.405c-1.19 3.589-.253 7.543 2.421 10.216 1.906 1.905 4.461 2.929 7.072 2.929 1.052 0 2.113-.166 3.144-.508l131.278-43.508c2.064-.589 4.072-2.47 4.072-2.47l122.32-122.32 36.552 36.552c-11.221 36.454-1.456 76.548 25.745 103.75 15.053 15.053 34.05 24.98 54.937 28.71 6.114 1.092 12.259 1.634 18.378 1.634 14.301 0 28.454-2.962 41.686-8.792 3.02-1.331 5.189-4.066 5.797-7.31.607-3.243-.424-6.578-2.758-8.912l-47.709-47.708 33.729-33.729 47.708 47.708c2.334 2.334 5.669 3.37 8.912 2.758 3.244-.607 5.979-2.776 7.309-5.797 8.325-18.895 10.801-39.665 7.159-60.065-3.727-20.888-13.655-39.884-28.708-54.938zm-68.461-309.873c3.446-3.446 8.027-5.344 12.9-5.344s9.454 1.897 12.9 5.344l47.927 47.927c3.445 3.445 5.343 8.026 5.343 12.9 0 4.873-1.898 9.455-5.344 12.9l-32.447 32.447-73.726-73.727zm-269.104 158.9c-1.91-1.91-4.467-2.929-7.073-2.929-1.188 0-2.388.212-3.539.648-30.698 11.624-65.526 4.146-88.729-19.057-20.932-20.932-28.988-50.46-22.26-78.403l43.425 43.426c3.905 3.904 10.237 3.904 14.142 0l47.871-47.871c3.905-3.905 3.905-10.237 0-14.142l-43.425-43.425c27.941-6.73 57.47 1.328 78.403 22.26 23.203 23.203 30.683 58.031 19.057 88.728-1.393 3.679-.501 7.832 2.28 10.613l40.959 40.959-40.152 40.152zm-116.231 300.162 14.465-43.648 29.181 29.181zm64.891-21.506-43.385-43.385 10.686-32.244 64.942 64.942zm50.778-20.437-29.792-29.792 97.884-97.884c3.905-3.905 3.905-10.237 0-14.142-3.904-3.904-10.237-3.904-14.142 0l-97.884 97.884-29.793-29.792 296.804-296.804.807.807 28.984 28.985-134.99 134.991c-3.905 3.905-3.905 10.237 0 14.142 1.952 1.952 4.512 2.929 7.071 2.929s5.119-.977 7.071-2.929l134.99-134.991 29.792 29.793zm346.245-14.701-43.425-43.425c-1.875-1.875-4.419-2.929-7.071-2.929s-5.196 1.054-7.071 2.929l-47.87 47.871c-3.905 3.905-3.905 10.237 0 14.142l43.425 43.426c-27.945 6.727-57.471-1.328-78.403-22.26-23.203-23.203-30.683-58.031-19.057-88.729 1.393-3.679.501-7.832-2.281-10.613l-40.959-40.959 40.152-40.152 40.96 40.96c2.781 2.781 6.933 3.675 10.613 2.28 30.695-11.626 65.525-4.146 88.728 19.057 20.932 20.932 28.988 50.46 22.259 78.402z"
                              fill="#000000"
                              data-original="#000000"
                              style=""
                              class=""
                            />
                            <g>
                              <path
                                d="m236.378 285.621c-4.181 0-7.997-2.71-9.405-6.636-1.388-3.872-.2-8.321 2.936-10.987 3.276-2.785 8.092-3.113 11.745-.869 3.506 2.154 5.319 6.422 4.523 10.442-.913 4.615-5.092 8.05-9.799 8.05z"
                                fill="#000000"
                                data-original="#000000"
                                style=""
                                class=""
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  Skills
                </div>
                <div class="skills-content fieldContent-fancy">
                  ${renderConditionally(
                    hardSkills.length,
                    `
                    <div class="skills-section--large">
                      <div class="skills-title">Hard</div>
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
                    softSkills.length,
                    `
                    <div class="skills-section">
                      <div class="skills-title">Soft</div>
                      <div class="fieldContent skills">
                        <!-- map softSkills -->
                        ${softSkills?.reduce(
                          (html, ss) =>
                            html +
                            `
                            <div class="skill">
                              <div class="skill-name--full-width">${ss.name}</div>
                            </div>
                            `,
                          '',
                        )}
                      </div>
                    </div>
                  `,
                  )}
                  ${renderConditionally(
                    otherTools.length,
                    `
                    <div class="skills-section">
                      <div class="skills-title">Other</div>
                      <div class="fieldContent skills">
                        <!-- map otherTools -->
                        ${otherTools?.reduce(
                          (html, ot) =>
                            html +
                            `
                            <div class="skill">
                              <div class="skill-name--full-width">${ot.name}</div>
                            </div>
                            `,
                          '',
                        )}
                      </div>
                    </div>
                  `,
                  )}
                </div>
              </div>
            `,
            )}
          </div>
          <div class="side-content">
            <div class="field">
              ${renderConditionally(
                personalInfo?.about,
                `
                <div class="fieldTitle">About</div>
                <div class="about">${generateMarkdownFromText(personalInfo?.about)}</div>
              `,
              )}
            </div>
            <div class="field">
              <div class="fieldTitle">Contact</div>
              <div class="fieldContent contact">
                ${renderConditionally(
                  personalInfo?.email,
                  `
                    <div class="contact-info">
                      <div class="contact-info-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xmlns:svgjs="http://svgjs.com/svgjs"
                          version="1.1"
                          width="16"
                          height="16"
                          x="0"
                          y="0"
                          viewBox="0 0 512 512"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <g xmlns="http://www.w3.org/2000/svg">
                              <g>
                                <path
                                  d="M485.743,85.333H26.257C11.815,85.333,0,97.148,0,111.589V400.41c0,14.44,11.815,26.257,26.257,26.257h459.487    c14.44,0,26.257-11.815,26.257-26.257V111.589C512,97.148,500.185,85.333,485.743,85.333z M475.89,105.024L271.104,258.626    c-3.682,2.802-9.334,4.555-15.105,4.529c-5.77,0.026-11.421-1.727-15.104-4.529L36.109,105.024H475.89z M366.5,268.761    l111.59,137.847c0.112,0.138,0.249,0.243,0.368,0.368H33.542c0.118-0.131,0.256-0.23,0.368-0.368L145.5,268.761    c3.419-4.227,2.771-10.424-1.464-13.851c-4.227-3.419-10.424-2.771-13.844,1.457l-110.5,136.501V117.332l209.394,157.046    c7.871,5.862,17.447,8.442,26.912,8.468c9.452-0.02,19.036-2.6,26.912-8.468l209.394-157.046v275.534L381.807,256.367    c-3.42-4.227-9.623-4.877-13.844-1.457C363.729,258.329,363.079,264.534,366.5,268.761z"
                                  fill="#ffffff"
                                  data-original="#000000"
                                />
                              </g>
                            </g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                          </g>
                        </svg>
                      </div>
                      <div class="breakable-text">${personalInfo.email}</div>
                    </div>
                  `,
                )}

                  ${renderConditionally(
                    personalInfo?.phone,
                    `
                    <div class="contact-info">
                      <div class="contact-info-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xmlns:svgjs="http://svgjs.com/svgjs"
                          version="1.1"
                          width="16"
                          height="16"
                          x="0"
                          y="0"
                          viewBox="0 0 482.6 482.6"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                          class="contact-info-icon"
                        >
                          <g>
                            <g xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2   c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14   c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8   c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8   c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8   c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4   c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2   c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6   c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4   c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8   c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6   c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2   c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2   c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5   C28.039,146.4,24.139,124.3,25.739,104.2z"
                                fill="#ffffff"
                                data-original="#000000"
                                style=""
                                class=""
                              />
                            </g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                            <g xmlns="http://www.w3.org/2000/svg"></g>
                          </g>
                        </svg>
                      </div>
                      <div class="breakable-text">${personalInfo.phone}</div>
                    </div>
                    `,
                  )}

                  ${renderConditionally(
                    personalInfo?.address,
                    `
                    <div class="contact-info">
                      <div class="contact-info-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xmlns:svgjs="http://svgjs.com/svgjs"
                          version="1.1"
                          width="16"
                          height="16"
                          x="0"
                          y="0"
                          viewBox="0 0 512 512"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <g xmlns="http://www.w3.org/2000/svg">
                              <circle cx="256" cy="165" r="75" fill="#ffffff" data-original="#000000" style="" class="" />
                              <path
                                d="m256 0c-81.108 0-165 61.714-165 165 0 94.351 147.217 274.08 153.472 281.609 2.856 3.413 7.075 5.391 11.528 5.391s8.672-1.978 11.528-5.391c6.255-7.529 153.472-187.258 153.472-281.609 0-90.981-74.019-165-165-165zm0 270c-57.891 0-105-47.109-105-105s47.109-105 105-105 105 47.109 105 105-47.109 105-105 105z"
                                fill="#ffffff"
                                data-original="#000000"
                                style=""
                                class=""
                              />
                              <path
                                d="m357.087 377.811c-28.922 41.873-55.961 75.306-66.487 87.973-8.643 10.327-21.241 16.216-34.6 16.216s-25.957-5.889-34.541-16.143c-10.551-12.698-37.608-46.155-66.544-88.046-38.83 13.722-63.915 35.1-63.915 59.189 0 41.42 73.874 75 165 75s165-33.58 165-75c0-24.088-25.084-45.467-63.913-59.189z"
                                fill="#ffffff"
                                data-original="#000000"
                                style=""
                                class=""
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div>${personalInfo.address}</div>
                    </div>
                    `,
                  )}
                ${renderConditionally(
                  personalInfo?.websites?.length,
                  `
                  <div class="contact-info">
                    <div class="contact-info-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns:svgjs="http://svgjs.com/svgjs"
                        version="1.1"
                        width="16"
                        height="16"
                        x="0"
                        y="0"
                        viewBox="0 0 26 26"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                        class="contact-info-icon"
                      >
                        <g>
                          <g xmlns="http://www.w3.org/2000/svg">
                            <path
                              style=""
                              d="M8.083,11.222L6.419,15c-0.041,0.094-0.144,0.154-0.257,0.154H5.31   c-0.113,0-0.216-0.061-0.256-0.154l-0.79-1.803c-0.077-0.178-0.147-0.348-0.213-0.517c-0.073,0.186-0.148,0.359-0.223,0.525   l-0.833,1.8c-0.042,0.091-0.144,0.149-0.255,0.149H1.888c-0.117,0-0.219-0.063-0.259-0.158l-1.557-3.779   c-0.03-0.074-0.018-0.156,0.034-0.221s0.135-0.103,0.225-0.103H1.29c0.121,0,0.227,0.069,0.263,0.169l0.684,1.92   c0.057,0.162,0.11,0.315,0.159,0.461c0.06-0.146,0.125-0.3,0.194-0.463l0.842-1.932c0.041-0.093,0.143-0.155,0.256-0.155H4.48   c0.115,0,0.217,0.063,0.258,0.157l0.798,1.89c0.072,0.17,0.136,0.329,0.195,0.479c0.049-0.142,0.106-0.296,0.171-0.465l0.737-1.898   c0.038-0.098,0.143-0.164,0.26-0.164h0.926c0.091,0,0.175,0.039,0.227,0.104C8.105,11.064,8.115,11.147,8.083,11.222z    M17.005,11.222L15.341,15c-0.041,0.094-0.144,0.154-0.256,0.154h-0.854c-0.113,0-0.215-0.061-0.256-0.154l-0.789-1.803   c-0.078-0.178-0.148-0.348-0.214-0.517c-0.073,0.186-0.148,0.359-0.223,0.525l-0.833,1.8c-0.042,0.091-0.143,0.149-0.255,0.149   h-0.853c-0.116,0-0.219-0.063-0.259-0.158l-1.557-3.779c-0.03-0.074-0.018-0.156,0.034-0.221c0.052-0.064,0.136-0.103,0.225-0.103   h0.959c0.121,0,0.227,0.069,0.263,0.169l0.683,1.92c0.057,0.162,0.11,0.315,0.161,0.461c0.059-0.146,0.123-0.3,0.192-0.463   l0.843-1.932c0.04-0.093,0.142-0.155,0.256-0.155H13.4c0.115,0,0.218,0.063,0.258,0.157l0.799,1.89   c0.071,0.17,0.135,0.329,0.193,0.479c0.051-0.142,0.106-0.296,0.172-0.465l0.737-1.898c0.038-0.098,0.144-0.164,0.261-0.164h0.926   c0.092,0,0.177,0.039,0.227,0.104C17.026,11.064,17.038,11.147,17.005,11.222z M25.926,11.222L24.263,15   c-0.042,0.094-0.144,0.154-0.257,0.154h-0.853c-0.113,0-0.216-0.061-0.256-0.154l-0.789-1.803   c-0.078-0.178-0.148-0.348-0.214-0.517c-0.073,0.186-0.149,0.359-0.224,0.525l-0.833,1.8c-0.042,0.091-0.144,0.149-0.255,0.149   H19.73c-0.117,0-0.22-0.063-0.26-0.158l-1.557-3.779c-0.029-0.074-0.019-0.156,0.033-0.221s0.136-0.103,0.226-0.103h0.96   c0.121,0,0.227,0.069,0.262,0.169l0.684,1.92c0.057,0.162,0.11,0.315,0.16,0.461c0.059-0.146,0.123-0.3,0.192-0.463l0.843-1.932   c0.041-0.093,0.143-0.155,0.257-0.155h0.791c0.115,0,0.218,0.063,0.258,0.157l0.798,1.89c0.072,0.17,0.137,0.329,0.196,0.479   c0.049-0.142,0.106-0.296,0.171-0.465l0.738-1.898c0.037-0.098,0.142-0.164,0.26-0.164h0.926c0.092,0,0.176,0.039,0.227,0.104   C25.946,11.064,25.958,11.147,25.926,11.222z"
                              fill="#ffffff"
                              data-original="#030104"
                            />
                            <g>
                              <path
                                style=""
                                d="M2.71,9c0.283-0.718,0.637-1.401,1.057-2.037C3.829,6.975,3.887,7,3.952,7h1.88    c-0.199,0.634-0.355,1.309-0.49,2h2.055c0.155-0.699,0.335-1.376,0.562-2h9.986c0.227,0.624,0.407,1.301,0.562,2h2.055    c-0.135-0.691-0.291-1.366-0.49-2h1.88c0.065,0,0.123-0.025,0.186-0.037C22.556,7.599,22.911,8.282,23.194,9h2.121    c-1.691-5.216-6.591-9-12.363-9S2.28,3.784,0.588,9H2.71z M20.478,5H19.29c-0.258-0.543-0.542-1.05-0.851-1.519    C19.179,3.909,19.861,4.419,20.478,5z M12.952,2c1.551,0,2.983,1.154,4.062,3H8.89C9.969,3.154,11.401,2,12.952,2z M7.463,3.481    C7.155,3.95,6.871,4.457,6.613,5H5.426C6.043,4.419,6.725,3.909,7.463,3.481z"
                                fill="#ffffff"
                                data-original="#030104"
                              />
                              <path
                                style=""
                                d="M23.194,17c-0.283,0.719-0.638,1.4-1.057,2.037C22.075,19.025,22.017,19,21.952,19h-1.881    c0.199-0.634,0.355-1.309,0.49-2h-2.055c-0.154,0.699-0.335,1.377-0.562,2H7.959c-0.227-0.623-0.407-1.301-0.562-2H5.343    c0.135,0.691,0.291,1.366,0.49,2H3.952c-0.065,0-0.123,0.025-0.185,0.037C3.348,18.4,2.993,17.719,2.71,17H0.588    c1.692,5.216,6.592,9,12.364,9s10.672-3.784,12.363-9H23.194z M5.426,21h1.188c0.258,0.543,0.542,1.051,0.85,1.519    C6.725,22.091,6.043,21.581,5.426,21z M12.952,24c-1.551,0-2.983-1.154-4.062-3h8.123C15.935,22.846,14.503,24,12.952,24z     M18.44,22.519c0.309-0.468,0.593-0.976,0.851-1.519h1.188C19.861,21.581,19.179,22.091,18.44,22.519z"
                                fill="#ffffff"
                                data-original="#030104"
                              />
                            </g>
                          </g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                        </g>
                      </svg>
                    </div>
                    <div class="fieldContent websites">
                      <!-- map websites -->
                      ${personalInfo?.websites?.reduce(
                        (html, site) =>
                          html +
                          `<div class="breakable-text">
                            <div class="small-mark"></div>
                            ${site}
                          </div>`,
                        '',
                      )}
                    </div>
                  </div>
                  `,
                )}
              </div>
            </div>
            ${renderConditionally(
              languages?.length,
              `
              <div class="field">
                <div class="fieldTitle">Languages</div>
                <div class="fieldContent languages">
                  <!-- map languages -->
                  ${languages?.reduce(
                    (html, language) =>
                      html +
                      `<div class="breakable-text">
                        <div class="small-mark"></div>
                        ${language}
                      </div>`,
                    '',
                  )}
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

export { fancy };
