'use strict';

let service          = require('../..');
let createError      = require('create-error');
let SomeUnknownError = createError('SomeUnknownError');

let server = service({
  erroring: function(payload) {
    throw new SomeUnknownError('an error message');
  }
}, [{
  method: 'erroring'
}]);

server.listen(process.env.SERVICE_PORT, function() {
  console.log('Listening on ' + process.env.SERVICE_PORT);
});