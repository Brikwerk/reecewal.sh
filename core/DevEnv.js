let devEnv = false;

if (process && process.env.NODE_ENV === 'development') {
    devEnv = true;
}
  
export { devEnv };