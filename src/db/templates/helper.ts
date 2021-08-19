const renderConditionally = (checkElement: any, contentToRender: string) => (checkElement ? contentToRender : '');

export { renderConditionally };
