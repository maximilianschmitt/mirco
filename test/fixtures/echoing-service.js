'use strict';

let service = require('../..');

let server = service({
  echo: function(payload) {
    return payload;
  }
}, [{
  method: 'echo',
  returns: 'echoed'
}]);

server.listen(process.env.SERVICE_PORT, function() {
  console.log('Listening on ' + process.env.SERVICE_PORT);
});