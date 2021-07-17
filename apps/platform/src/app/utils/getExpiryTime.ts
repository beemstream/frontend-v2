export const getExpiryTime = (seconds: number) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};
