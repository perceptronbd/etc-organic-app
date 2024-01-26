export const imageURL = (str) => {
  const prefix = "public/uploads/";
  if (str.startsWith(prefix)) {
    const url = str.slice(prefix.length);
    return `${import.meta.env.VITE_ETC_API}/uploads/${url}`;
  }
  return str;
};
