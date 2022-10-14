export const removeHtmlTags = (str) => {
  return `${str}`?.replace(/<[^>]*>?/gm, '');
};
