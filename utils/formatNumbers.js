export const formatNumbers = (number) => {
  const formattedNumber = new Intl.NumberFormat("bn-IN-u-nu-beng").format(
    number,
  );
  return formattedNumber;
};
