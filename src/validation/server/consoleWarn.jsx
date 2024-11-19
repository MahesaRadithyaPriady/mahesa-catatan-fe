const ConsoleWarn = () => {
  const settings = true;
  if (!settings) {
    console.warn("Development Mode");
  } else if (settings) {
    console.error = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.debug = () => {};
  }
};

export default ConsoleWarn;
