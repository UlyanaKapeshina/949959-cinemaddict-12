export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, child, place) => {
  if (container.element) {
    container = container.element;
  }
  if (child.element) {
    child = child.element;
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.AFTEREND:
      container.after(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};
export const remove = function (container, child) {
  if (container.element) {
    container = container.element;
  }
  if (child.element) {
    child = child.element;
  }
  container.removeChild(child);
};
export const removeClassNames = (className, parentElement) => {
  const elements = parentElement.querySelectorAll(`.${className}`);
  for (let element of elements) {
    element.classList.remove(className);
  }
};
export const addClassName = (className, element) => {
  element.classList.add(className);
};
export const removeClassName = (className, element) => {
  element.classList.remove(className);
};
export const changeActiveClass = (className, element, parentElement) => {
  removeClassNames(className, parentElement);
  addClassName(className, element);
};
