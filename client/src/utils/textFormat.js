export const textFormat = (str) => {
  return str
    ?.replace(/([A-Z])/g, " $1")
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
};
