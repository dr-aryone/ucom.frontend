export const hideMenuPopup = () => ({ type: 'HIDE_MENU_POPUP' });
export const showMenuPopup = () => ({ type: 'SHOW_MENU_POPUP' });

export const triggerMenuPopup = () => (dispatch, getState) => {
  const state = getState();

  if (state.menuPopup.menuPopupVisibility) {
    dispatch(hideMenuPopup());
  } else {
    dispatch(showMenuPopup());
  }
};
