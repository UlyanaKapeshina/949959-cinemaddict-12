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
