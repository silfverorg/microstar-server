const express = require('express');
const {getConfig} = require('./config');
const {TrackRouter, FetchRouter} = require('./src/routers');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const pjson = require('./package.json');
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
    app.listen(config.server.port);
    console.log('Server is version ' + VERSION);
    console.log('Started server on ' + config.server.port);
}

module.exports = app;
