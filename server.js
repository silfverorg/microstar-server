import express from 'express';
import config from './config';
import {microstarTrack} from 'microstar-track'

const VERSION = '0.0.1';

const app = express();

app.get('/', (req, res) => {
    res.json({
        version: VERSION,
        status: 200,
    });
});

app.use('/track', trackModule);

if (require.main === module) {
    app.listen(config.server.port);
}

export default app;
