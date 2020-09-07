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
export const RENDER_POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.AFTEREND:
      container.after(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};
export const remove = function (container, element) {
  container.removeChild(element);
};
