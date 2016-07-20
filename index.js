global.t = require('moment');
global._ = require('lodash');

var cookieParser = require('cookie-parser'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    dotenv = require('node-env-file'),
    env = process.env.NODE_ENV || 'development',
    router = require('./lib/routes'),
    app = express();

if (env === 'development') {
    dotenv(__dirname + '/.env');
}

console.log('Starting server in ' + env + ' mode...');

console.log('\nConnecting to MongoDB at ' + process.env.DB_URL + ' ...');
mongoose.connect(process.env.DB_URL);

mongoose.connection.on('open', function () {
    console.log('\nConnected to MongoDB...');
});

mongoose.connection.on('error', function () {
    console.error('\nUnable to connect to MongoDB server!');
});

app.use(morgan('dev'));
app.use(cookieParser());
app.dir = process.cwd();

// things to do on each request
router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Standard error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/', router);

var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;