export const initDragAndDropListeners = (targetElement, onDragenter, onDragLeave) => {
  let dragenter = false;
  let dragleave = false;

  const onDragEnterListener = () => {
    if (dragenter) {
      dragleave = false;
      onDragenter();
    }
    dragenter = true;
  };

  const onDragLeaveListener = () => {
    if (dragleave) {
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

/* // App.js
initDragAndDropListeners(document, () => {
  body.addClass('...');
}, () => {
  body.removeClass('...');
});

// Comment.jsx
initDragAndDropListeners(textarea, () => {
  this.setState({ dragenter: true });
}, () => {
  this.setState({ dragenter: true });
});

// CSS comments
:global(.body.dragenter) .comment.dragenter {
  // red background
}


// onFocus = active
// onBlur = !active

:global(.body.dragenter) .comment.active {
  // red border
}
*/
