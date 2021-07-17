export const isDateExpired = (date: string) => {
  const parsedTime = new Date(date).getTime();

  return new Date().getTime() >= parsedTime;
};
