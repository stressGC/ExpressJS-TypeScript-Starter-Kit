const randomRouter =  require('./randomRouter');

module.exports = (app) => {
  app.use('/random', randomRouter);
}
