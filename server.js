var path = require('path');
var express = require('express');
//var webpack = require('webpack');
//var config = require('./webpack.config');

var app = express();

//use in webpack development mode
//var compiler = webpack(config);
//app.use(require('webpack-dev-middleware')(compiler, {
//  noInfo: true,
//  publicPath: config[0].output.publicPath
//}));
//app.use(require('webpack-hot-middleware')(compiler));

//use in webpack production mode
app.use(express.static(__dirname));

app.get('/todomvc', function(req, res) {
  res.sendFile(path.join(__dirname, 'todomvc/index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
