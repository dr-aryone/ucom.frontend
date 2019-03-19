import { KEY_RETURN, KEY_ESCAPE } from 'keycode-js';

export const isSubmitKey = e => (e.ctrlKey || e.metaKey) && e.keyCode === KEY_RETURN;
export const isEnterKey = e => e.keyCode === KEY_RETURN;
export const isEscKey = e => e.keyCode === KEY_ESCAPE;
