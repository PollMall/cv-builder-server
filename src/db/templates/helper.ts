const renderConditionally = (checkElement: unknown, contentToRender: string) => (checkElement ? contentToRender : '');

const generateMultiLineText = (text: string) =>
  text?.split('\n')?.reduce((html, line) => (html += `<div>${line}</div>`), '');

export { renderConditionally, generateMultiLineText };
