const express = require('express');
const Microstar = require('microstar-track');

let trackModule;
const router = express.Router();

router.get('/', (req, res) => {
  const body = req.query;
  const event_name = body.event_name;
  const event_data = body.event_data;
  const keys = Object.keys(body);
  const _vars = {_ip: (req.connection && req.connection.remoteAddress || null)}
  for(var i = 0; i < keys.length; i +=1 ) {
    const key = keys[i];
    if (/^\_/.test(key)) {
      _vars[key] = body[key];
    }
  }

  if (!event_name) {
    return res.status(400).jsonp({
      status: 400,
      error: 'Invalid event'
    });
  }
  
  trackModule.track(event_name, event_data, _vars)
  .then((result) => {
    res.jsonp(result);
  })
  .catch((err) => {
    res.status(500).jsonp({
      status: 500,
      error: err
    });
  });
});

const RouterConstructor = (config) => {
  trackModule = new Microstar(config).trackModule;
  return router;
};

module.exports = RouterConstructor;
