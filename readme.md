# express-micro-service

Easy microservices powered by Express.

## Usage

### Server

```js
'use strict';

let service = require('express-micro-service');

let server = service({
  hello: function(payload) {
    return 'Hello, ' + payload.name;
  }
}, [
  {
    method: 'hello',
    returns: 'greeting'
  }
]);

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
  .then(res => {
    console.log(res.data); // { greeting: 'Hello, Max' }
  });
```