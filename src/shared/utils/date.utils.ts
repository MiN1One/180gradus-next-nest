interface IExpirationDateOptions {
  year?: number;
  minutes?: number;
  month?: number;
  seconds?: number;
  date?: number;
}

export const getExirationDate = (expiration: IExpirationDateOptions) => {
  const { year, minutes, month, seconds, date } = expiration;
  const currentDate = new Date();
  if (date) {
    currentDate.setDate(currentDate.getDate() + date);
  }
  if (year) {
    currentDate.setFullYear(currentDate.getFullYear() + year);
  }
  if (minutes) {
    currentDate.setMinutes(currentDate.getMinutes() + minutes);
  }
  if (month) {
    currentDate.setMonth(currentDate.getMonth() + month);
  }
  if (seconds) {
    currentDate.setSeconds(currentDate.getSeconds() + seconds);
  }
  return currentDate;
};