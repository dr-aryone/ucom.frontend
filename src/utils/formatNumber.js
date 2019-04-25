import { memoize } from 'lodash';

// https://stackoverflow.com/questions/16637051/adding-space-between-numbers
export default memoize((x = 0) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
});
