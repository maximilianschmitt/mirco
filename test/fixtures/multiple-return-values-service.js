'use strict';

let service = require('../..');

let server = service({
  brothers: function() {
    return {
      max: 'my name is max',
      julian: 'my name is julian'
    };
  }
}, [{
  method: 'brothers',
  returns: ['max', 'julian']
}]);

server.listen(process.env.SERVICE_PORT, function() {
  console.log('Listening on ' + process.env.SERVICE_PORT);
});