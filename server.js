import express from 'express';
import {getConfig} from './config';
import {TrackRouter, FetchRouter} from './src/routers';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import http from 'http';

import pjson from './package.json';
const RethinkdbWebsocketServer = require('rethinkdb-websocket-server');
const VERSION = pjson.version;

const config = getConfig(process.env.NODE_ENV);

const app = express();
app.use((req, res, next) => {
  //FIXME This is bad implementation. But works.
  //This crashes the whole server when data isn't json
  req.headers['content-type'] = 'application/json';
  //req.headers['content-type'] = req.headers['content-type'] || 'application/json';
  next();
});

app.use((req, res, next) => {
    //Sets json to pretty when asking for it
    //Check if we need to do this on each request.
    if (typeof req.query.pretty !== 'undefined') {
        app.set('json spaces', 3);
    } else {
        app.disable('json spaces');
    }
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
    const httpServer = http.createServer(app);

    RethinkdbWebsocketServer.listen({
      httpServer: httpServer,
      httpPath: '/db',
      dbHost: config.db.host,
      dbPort: config.db.port,
      unsafelyAllowAnyQuery: true,
    });
    httpServer.listen(config.server.port);
    console.log('Server is version ' + VERSION);
    console.log('Started server on ' + config.server.port);
}

export default app;
