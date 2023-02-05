const debounce = (callbackFunction, timeout = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callbackFunction.apply(this, args); }, timeout);
  };
}

export { debounce };
