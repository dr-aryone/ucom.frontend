// import Validator from './../utils/validator';

// export const validateFields = (
//   data = {}, fields = [], rules = {}, isAll = false,
//   customNames = {},
// ) => {
//   const validation = new Validator(data, rules);

//   if (customNames.customName) {
//     validation.setAttributeFormatter(() => customNames.customName);
//   }

//   const isValid = validation.passes();
//   const errors = isAll ?
//     validation.errors.all() :
//     fields.reduce((value, field) => ({ ...value, [field]: validation.errors.get(field) }), {});
//   return { isValid, errors };
// };





// let data = {
//   firstName: 'Alex',
//   about: 'asd',
//   personalWebsiteUrl: 'https://ya.ru',
//   usersSources: [{
//     sourceUrl: 'http://ya.ru',
//   }],
// };

const rule = {
  firstName: value => (!value && 'Displayed name is required'),

  personalWebsiteUrl: value =>
    !value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) && 'Not a valid URL format',
  // (value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/) && 'Not a valid URL format'),

  usersSources: [{
    sourceUrl: value =>
      !value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm) && 'Not a valid URL format',
    // (value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/) && 'Not a valid URL format'),
    // (!URL_REGEXP.test(value) && 'Site is not valid'),
  }],
};

// let errors = {
  // firstName: 'Displayed name is reqired',
  // sites: ['Error', '1 Error'],
  // partners: [{
  //   url: 'Url error',
  //   title: 'Title error',
  // }],
// };

export const validator = (data, rules = rule) => {
  const fields = Object.keys(data);
  const errors = {};

  fields.forEach((field) => {
    const rule = rules[field];

    console.log('rule: ', rule);

    if (!rule) {
      return;
    }

    if (typeof rule === 'function') {
      errors[field] = rule(data[field]);
    } else if (Array.isArray(rule) && typeof rule[0] === 'function') {
      errors[field] = data[field].map(value => rule[0](value));
    } else if (Array.isArray(rule) && typeof rule[0] === 'object') {
      errors[field] = data[field].map((obj) => {
        const keys = Object.keys(rule[0]);
        const errors = {};
        keys.forEach((key) => {
          errors[key] = rule[0][key](obj[key]);
        });
        return errors;
      });
    }
  });

  return errors;
};
