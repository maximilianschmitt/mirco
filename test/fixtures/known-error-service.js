'use strict';

let service        = require('../..');
let createError    = require('create-error');
let SomeKnownError = createError('SomeKnownError');

let server = service({
  erroring: function(payload) {
    throw new SomeKnownError('an error message');
  }
}, [{
  method: 'erroring',
  throws: 'SomeKnownError'
}]);

server.listen(process.env.SERVICE_PORT, function() {
  console.log('Listening on ' + process.env.SERVICE_PORT);
});