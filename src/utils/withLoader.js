import loader from './loader';

export default async (func) => {
  await loader.start();
  await func();
  await loader.done();
};
