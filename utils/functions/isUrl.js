export const isURL = (text) => {
  const urlRegex = /^(https?:\/\/)/;
  const urlRegex2 = /^(http?:\/\/)/;
  return urlRegex.test(text) || urlRegex2.test(text);
};
