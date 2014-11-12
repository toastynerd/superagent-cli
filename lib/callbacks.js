module.exports = function(request) {
  var callback;

  if (request.detail || request.verbose) {
    callback = function(err, res) {
      if (err) {
        console.error(err);
      }
      console.log(res);
    };
  } else {
    callback = function(err, res) {
      if (err) {
        console.log(err);
      }
      if (!res.body || !Object.keys(res.body).length) {
        console.error(res.text);
      }
      console.log(res.body);
    };
  }
  return callback;
};
