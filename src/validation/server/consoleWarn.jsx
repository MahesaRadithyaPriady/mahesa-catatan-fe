const ConsoleWarn = () => {
  if (import.meta.env.VITE_NODE_ENV === "development") {
    console.warn("Development Mode");
  } else if (import.meta.env.VITE_NODE_ENV === "production") {
    console.error = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.debug = () => {};
  }
};

export default ConsoleWarn;
