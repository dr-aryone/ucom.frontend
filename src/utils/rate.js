export const formatRate = (rate, showSign = false) => (
  `${rate ? rate.toLocaleString('ru-RU') : 0}${showSign ? '°' : ''}`
);
