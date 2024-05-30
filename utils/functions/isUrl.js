export const isURL = (text) => {
  const urlRegex = /^(https?:\/\/)/;
  const urlRegex2 = /^(http?:\/\/)/;
  console.log("isUrl----->", urlRegex.test(text) || urlRegex2.test(text), text);
  return urlRegex.test(text) || urlRegex2.test(text);
};
