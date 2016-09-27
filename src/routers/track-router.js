const express = require('express');
const {TrackModule} = require('microstar-track');

let trackModule;
const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;
  const event_name = body.event_name;
  const event_data = body.event_data;
  const keys = Object.keys(body);
  const $_vars = {}
  for(var i = 0; i < keys.length; i +=1 ) {
    const key = keys[i];
    if (/^\$\_/.test(key)) {
      $_vars[key] = body[key];
    }
  }

  if (!event_name) {
      return res.status(400).json({
      status: 400,
      error: 'Invalid event'
    });
  }

  trackModule.track(event_name, event_data, $_vars)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.error('An error with tracking API', err.stack);
    res.status(500).json({
        status: 500,
        error: err
    });
  });
});

const RouterConstructor = (config) => {
  trackModule = new TrackModule(config);
  return router;
};

module.exports = RouterConstructor;
