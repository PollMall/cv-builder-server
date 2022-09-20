import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

const renderConditionally = (checkElement: unknown, contentToRender: string) => (checkElement ? contentToRender : '');

const generateMarkdownFromText = (text: string) => markdown.render(text);

export { renderConditionally, generateMarkdownFromText };
