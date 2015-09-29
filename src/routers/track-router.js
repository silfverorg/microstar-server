import express from 'express';
import TrackModule from 'microstar-track';

let trackModule;
const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;
  const event = body.event;
  const data = body.data;
  if (!event) {
    return res.json({
      status: 400,
      error: 'Invalid event'
    });
  }
  trackModule.track(event, data)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.error('An error with tracking API', err.stack);
    res.status(500).end();
  });
});

const RouterConstructor = (config) => {
  trackModule = new TrackModule(config);
  return router;
};
export default RouterConstructor;
