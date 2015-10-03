import express from 'express';
import {getConfig} from './config';
import {TrackRouter, FetchRouter} from './src/routers';
import bodyParser from 'body-parser';
import morgan from 'morgan'

const VERSION = '0.0.2';

const config = getConfig(process.env.NODE_ENV);

const app = express();
app.use((req, res, next) => {
  //FIXME This is bad implementation. But works.
  //This crashes the whole server when data isn't json
  req.headers['content-type'] = 'application/json';
  //req.headers['content-type'] = req.headers['content-type'] || 'application/json';
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({
        version: VERSION,
        status: 200,
    });
});

app.use('/track', TrackRouter(config.db));
app.use('/fetch', FetchRouter(config.db));

if (require.main === module) {
    app.listen(config.server.port);
    console.log('Started server on ' + config.server.port);
}

export default app;
