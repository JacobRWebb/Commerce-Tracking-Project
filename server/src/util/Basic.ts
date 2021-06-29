import crypto from "crypto";

export const hashString = (value: string): string =>
  crypto.createHash("SHA512").update(value).digest("hex");

export const findToken = (cookies: string): string | undefined => {
  const tokenCookie = cookies
    .split(";")
    .find((cookie) => cookie.split("=")[0] === "token");

  if (tokenCookie) return tokenCookie.split("=")[1];

  return undefined;
};

export const generateID = (length: number): string => {
  let auxiliary: string = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

  for (let i = 0; i < length; i++) {
    auxiliary += characters[Math.floor(Math.random() * characters.length)];
  }

  return auxiliary;
};
