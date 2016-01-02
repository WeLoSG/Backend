exports.errorHandler = function(err, req, res, next) {
  console.error(err.message);
  // error page
  res.status(500).send({
    error: err.message
  });
};
