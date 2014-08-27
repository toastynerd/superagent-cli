module.exports = function(request) {
  var callback;

  if (request.detail) {
    callback = function(err, res) {
      if (err) {
        console.log(err);
      }
      console.log(res);
    };
  } else {
    callback = function(err, res) {
      if (err) {
        console.log(err);
      }
      if (!res.body || !res.body.length) {
        console.log(res.text);
      }
      console.log(res.body);
    };
  }
  return callback;
};
