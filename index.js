'use strict';

let co           = require('co');
let express      = require('express');
let bodyParser   = require('body-parser');
let objectAssign = require('object-assign');

let service = function(service, endpoints) {
  let app = express();
  app.use(bodyParser.json());

  endpoints.forEach(function(endpoint) {
    app.post('/' + endpoint.method, function(req, res) {
      let payload = req.body;

      co(function*() {
        let response = { success: true };
        let result = yield service[endpoint.method](payload);

        if (Array.isArray(endpoint.returns)) {
          endpoint.returns.forEach(function(key) { response[key] = result[key]; });
        } else if (endpoint.returns) {
          response[endpoint.returns] = result;
        }

        res.json(response);
      })
      .catch(function(err) {
        handleError(err, endpoint, res);
      })
      .catch(function(err) {
        // crash the process
        setTimeout(function() {
          throw err;
        });
      });
    });
  });

  return app;
};

function handleError(err, endpoint, res) {
  let httpError = false;

  if (err.data && err.data.error && err.data.error.name) {
    err = err.data.error;
    httpError = true;
  }

  if (!endpoint.throws || endpoint.throws.indexOf(err.name) === -1) {
    res.status(500).json({ error: { name: 'Error', message: 'An unexpected error occurred.' } });

    if (!httpError) {
      throw err;
    }

    return;
  }

  res.status(400).json({ error: objectAssign({ name: err.name }, err) });
}

module.exports = service;