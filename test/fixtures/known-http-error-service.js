'use strict';

let service = require('../..');

let server = service({
  erroring: function(payload) {
    throw {
      data: {
        error: {
          name: 'KnownHttpError'
        }
      }
    };
  }
}, [{
  method: 'erroring',
  throws: 'KnownHttpError'
}]);

server.listen(process.env.SERVICE_PORT, function() {
  console.log('Listening on ' + process.env.SERVICE_PORT);
});