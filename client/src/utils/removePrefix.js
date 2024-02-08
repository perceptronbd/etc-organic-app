
export const imageURL = (str) => {
  //logs("removePrefix imageURL", [str],Style.code);
  const prefix = "public/uploads/";

  if (str === undefined || str === null || str === "") {
    
    return `${import.meta.env.VITE_ETC_API}/uploads/`;
  }

  if (str.startsWith(prefix)) {
    const url = str.slice(prefix.length);
    //logs("url", [`${import.meta.env.VITE_ETC_API}/uploads/${url}`],Style.code);
    return `${import.meta.env.VITE_ETC_API}/uploads/${url}`;
  }
  return `import.meta.env.VITE_ETC_API}/uploads`;
};
