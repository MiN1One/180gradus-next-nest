export const debounce = (
  cb: (...args: any) => void, 
  delay: number = 300
) => {
  let timeout: NodeJS.Timeout; 
  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setTimeout(() => {
      cb(...args);
      clearTimeout(timeout);
    }, delay);
  };
};

export const throttle = (
  cb: (...args: any) => void, 
  delay: number = 300
) => {
  let wait = false;
  let waitingArgs = null;

  const delayFunc = () => {
    if (waitingArgs === null) {
      wait = false;
      return;
    }
    cb(...waitingArgs);
    waitingArgs = null;
    setTimeout(delayFunc, delay);
  };
  
  return (...args: any) => {
    if (wait) {
      waitingArgs = args;
      return;
    }
    
    cb(...args);

    wait = true;
    waitingArgs = args;

    setTimeout(delayFunc, delay);
  };
};