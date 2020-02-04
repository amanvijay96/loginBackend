function errHandler(err, req, res, next) {
  res
    .status(err.statusCode)
    .send(`Error: ${err.message} status: ${err.statusCode}`);
  next(err);
}
//EXPORT ERROR HANDLER
module.exports = errHandler;