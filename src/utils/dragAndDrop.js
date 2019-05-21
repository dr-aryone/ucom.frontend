export const initDragAndDropListeners = (targetElement, onDragenter, onDragLeave) => {
  let dragenter = false;
  let dragleave = false;

  const onDragEnterListener = () => {
    if (dragenter && onDragenter) {
      dragleave = false;
      onDragenter();
    }
    dragenter = true;
  };

  const onDragLeaveListener = () => {
    if (dragleave && onDragLeave) {
      dragenter = false;
      onDragLeave();
    }
    dragleave = true;
  };

  targetElement.addEventListener('dragenter', onDragEnterListener);
  targetElement.addEventListener('dragleave', onDragLeaveListener);
  targetElement.addEventListener('drop', onDragLeave);

  return () => {
    targetElement.removeEventListener('dragenter', onDragEnterListener);
    targetElement.removeEventListener('dragleave', onDragLeaveListener);
    targetElement.removeEventListener('drop', onDragLeave);
  };
};
