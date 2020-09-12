const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const axios         = require('axios');
const { response }  = require('express');
const EventEmitter  = require('events');

// user imports
const Subscriber   = require('./services/subscriber');
const Publisher    = require('./services/publisher');

// initialize
const app         = express();
const config      = require('./config');
const emitter     = new EventEmitter();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Home default 200 response: nothing to see here.
app.get('/', function(req, res, next){
    res.sendStatus(200);
});

// logs to console (or app.log) the message
// emitted by the subscriber
app.post('/event', function(req, res, next){
    let message = req.body;
    console.log('event received message');
    console.log(message);

    res.sendStatus(200);
});

// Subscribers to provided topic
app.post('/subscribe/:topic', function(req, res, next){

    let topic       = req.params.topic || null;
    let forwardUrl  = req.body.url;

    // if we don't receive a json request.
    if (!req.is('application/json')) {
        // // Send error here
        return res.sendStatus(400);
    }

    new Subscriber(emitter).subscribe(topic, forwardUrl);
    res.sendStatus(200);
});

// publishes to provided topic
app.post('/publish/:topic', function(req, res, next){

    // if we don't receive a json request.
    if (!req.is('application/json')) {
        // // Send error here
        return res.sendStatus(400);
    }

    let topic   = req.params.topic  || null;
    let message = req.body          || {};

    new Publisher(emitter).publish(topic, topic, message);
    res.sendStatus(200);
});

module.exports = app;