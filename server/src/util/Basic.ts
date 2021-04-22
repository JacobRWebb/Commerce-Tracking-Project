export const generateID = (length: number): string => {
  let auxiliary: string = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

  for (let i = 0; i < length; i++) {
    auxiliary += characters[Math.floor(Math.random() * characters.length)];
  }

  return auxiliary;
};
