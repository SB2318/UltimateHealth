const logger = {
  log: (...args: unknown[]): void => {
    if (__DEV__) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (__DEV__) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (__DEV__) {
      console.error(...args);
    }
  },
};

export default logger;
