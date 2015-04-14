# express-micro-service

![Travis Build](http://img.shields.io/travis/maximilianschmitt/express-micro-service.svg?style=flat)

Easy microservices powered by Express.

## Installation

```
$ npm install express-micro-service
```

## Usage

Check out the tests for more information on what you can do with express-micro-service.

### Server

```js
'use strict';

let service = require('express-micro-service');

let server = service({
  hello: function(payload) {
    return 'Hello, ' + payload.name;
  }
}, [{
  method: 'hello',
  returns: 'greeting'
}]);

server.listen(process.env.SERVICE_PORT);
```

### Client

```js
'use strict';

let axios = require('axios');

axios
  .post('http://localhost:' + process.env.SERVICE_PORT + '/hello', {
    name: 'Max'
  })
  .then(res => console.log(res.data)); // { greeting: 'Hello, Max' }
```