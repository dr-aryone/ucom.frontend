import Validator from './../utils/validator';

export const validateFields = (
  data = {}, fields = [], rules = {}, isAll = false,
  customNames = {},
) => {
  const validation = new Validator(data, rules);

  if (customNames.customName) {
    validation.setAttributeFormatter(() => customNames.customName);
  }

  const isValid = validation.passes();
  const errors = isAll ?
    validation.errors.all() :
    fields.reduce((value, field) => ({ ...value, [field]: validation.errors.get(field) }), {});
  return { isValid, errors };
};


// let data = {
//   nickname: 'Alex',
//   sites: ['http://ya.ru', 'http://test.com'],
//   partners: [{
//     url: 'http://ya.ru',
//     title: 'Home',
//   }],
// };

// let rules = {
//   nickname: value =>
//     (!value && 'Nickname is reqired') ||
//     (!NIKNAME_REGEXP.test(value) && 'Nickname is not valid'),

//   sites: [
//     value =>
//       (!value && 'Site is reqired') ||
//       (!URL_REGEXP.test(value) && 'Site is not valid')
//   ],

//   partners: [{
//     url: value =>
//       (!value && 'Site is reqired') ||
//       (!URL_REGEXP.test(value) && 'Site is not valid'),
//     title: value =>
//       (!value && 'Site is reqired') ||
//       (!URL_REGEXP.test(value) && 'Site is not valid'),
//   }],
// };

// let errors = {
//   nickname: 'Some error',
//   sites: ['Error', '1 Error'],
//   partners: [{
//     url: 'Url error',
//     title: 'Title error',
//   }],
// };

// export const validator = (data, rules) => {
//   const fields = Object.keys(data);
//   const errors = {};

//   fields.forEach((field) => {
//     const rule = rules[field];

//     if (!rule) {
//       return;
//     }

//     if (typeof rule === 'function') {
//       errors[field] = rule(data[field]);
//     } else if (Array.isArray(rule) && typeof rule[0] === 'function') {
//       errors[field] = data[field].map(value => rule[0](value));
//     } else if (Array.isArray(rule) && typeof rule[0] === 'object') {
//       errors[field] = data[field].map((obj) => {
//         const keys = Object.keys(rule[0]);
//         const errors = {};
//         keys.forEach((key) => {
//           errors[key] = rule[0][key](obj[key]);
//         });
//         return errors;
//       });
//     }
//   });

//   return errors;
// };
