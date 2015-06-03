(function() {
  'use strict';

  var express = require('express');
  var chalk = require('chalk');
  var path = require('path');
  var bodyParser = require('body-parser');

  var app = express();

  var api = require('./routes/api');

  var PORT = process.env.PORT || 3111;

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use('/api', api);
  app.use(express.static(__dirname + '/../www'));

  app.get("/", function(req, res){
    res.sendFile(__dirname + '/../www/index.html');
  });

  var server = app.listen(PORT, function(){
    console.log(chalk.green('App started on port ' + PORT));
  });

})();
