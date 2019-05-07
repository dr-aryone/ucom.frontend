import loader from './loader';

export default (promise) => {
  loader.start();
  promise
    .then((e) => {
      loader.done();
      return e;
    })
    .catch((e) => {
      loader.done();
      throw e;
    });
};
