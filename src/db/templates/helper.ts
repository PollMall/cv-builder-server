import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({ breaks: true });

export const renderConditionally = (checkElement: unknown, contentToRender: string) =>
  checkElement ? contentToRender : '';

export const generateMarkdownFromText = (text: string) => markdown.render(text);

export const fromTimestampToMonthYearFormat = (stringDate: string, long?: string) => {
  const date = new Date(parseInt(stringDate, 10));
  const month = date.toLocaleString('default', { month: long ? 'long' : 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${month} ${year}`;
};
