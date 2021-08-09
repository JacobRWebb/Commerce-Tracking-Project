export const debounce = (func: () => void) => {
  var timer;
  return (event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
};

export const caseFix = (value: string): string => {
  let aux = value.toLowerCase();
  return value.charAt(0).toUpperCase() + aux.slice(1);
};
