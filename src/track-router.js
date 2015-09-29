import express from 'express';
import trackLibrary from './track-library.js';

const router = express.router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "You did a track!"
  });
});

export default router;
