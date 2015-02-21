module.exports = function(request) {
  var callback;

  if (request.detail || request.verbose) {
    callback = function(err, res) {
      if (err) 
        console.error(err);

      console.log(res);
    };
  } else {
    callback = function(err, res) {
      if (err) 
        return console.log(err);

      if (!res.body || !Object.keys(res.body).length)
        return console.error(res.text);

      if (res.text === JSON.stringify(res.body))
        return console.log(res.body);
      
      if (res.text)
        console.log(res.text);

      if (res.body)
        console.log(res.body);
    };
  }
  return callback;
};
