const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const axios         = require('axios')
const { response }  = require('express');
const EventEmitter  = require('events');

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

// 
app.post('/event', function(req, res, next){
    let message = req.body;
    console.log('event received message');
    console.log(message);

    res.sendStatus(200);
});

app.post('/subscribe/:topic', function(req, res, next){
    
    let topic       = req.params.topic || null;  
    let forwardUrl  = req.body.url;

    if (!req.is('application/json')) {

        // Send error here
        res.sendStatus(400);
        next();
    }
     
    // Sub/listen
    emitter.on(topic, function(message){

        // include the topic that trigger the event.
        let data = {
            topic: topic, 
            message: message
        };

        // forward message to posted forwarding url.
        axios.post(forwardUrl, data, config.axios.config)
            .then(res => {
                // console.log(`statusCode: ${res.status}`);
                // console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    });

    console.log('Subscribed to topic: '+topic+' and listening.');

    res.sendStatus(200);
});

app.post('/publish/:topic', function(req, res, next){
    
    let topic   = req.params.topic  || null;
    let message = req.body          || {};

    let payload = JSON.stringify(message);
    
    // publish/emit message
    emitter.emit(topic, message);

    res.sendStatus(200);
});


module.exports = app;