import { numberWithSpaces } from './number';

export const formatRate = rate => (
  rate ? numberWithSpaces(rate) : 0
);
