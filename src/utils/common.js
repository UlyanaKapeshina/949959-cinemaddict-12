import moment from "moment";
export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const getRandomArrayElement = (arr) => {
  const index = getRandomInteger(0, arr.length - 1);
  return arr[index];
};
export const getRandomArray = (arr, maxLength) => {
  const length = getRandomInteger(1, maxLength);
  const newArray = new Array(length).fill().map((it) => {
    it = getRandomArrayElement(arr);
    return it;
  });

  return newArray;
};
export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const formatDurationFilm = (duration) => {
  const milliseconds = moment.duration(duration, `m`).asMilliseconds();
  const hours = moment.duration(milliseconds).asHours();
  if (hours > 1) {
    return moment.utc(milliseconds).format(`h[h] mm[m]`);
  }
  return moment.utc(milliseconds).format(`mm[m]`);
};
export const formatDate = (date) => {
  return moment(date).format(`D MMMM YYYY`);
};
export const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};
