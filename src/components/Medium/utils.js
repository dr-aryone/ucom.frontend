export const getBlockFromElement = (element) => {
  if (!element || element.hasAttribute('data-medium-editor-element')) {
    return null;
  }

  const find = (el) => {
    if (el.parentElement.hasAttribute('data-medium-editor-element')) {
      return el;
    }

    return find(el.parentElement);
  };

  return find(element);
};
