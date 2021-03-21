export const timePromise = (ms: number) => {
  const timeout = new Promise<undefined>((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      reject("Unable to contact server.");
    }, ms);
  });
  return timeout;
};
