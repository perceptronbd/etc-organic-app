export const removeUploadsPrefix = (str) => {
  const prefix = "public/uploads/";
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
};
