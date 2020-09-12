const config      = require('../config');
const axios       = require('axios');

class Subscriber{

    constructor(emitter){
        this.emitter = emitter;
    }

    // Subscribes to provided event
    subscribe(event, url){
        this.emitter.once(event, function(topic, message){

            //forward message to posted forwarding url.
            axios.post(
                    url,
                    {
                        event: topic,
                        message: message
                    },
                    config.axios.config
                )
                .then(res => {})
                .catch(error => {
                    console.error(error);
                });
        });
        console.log('Subscribed to: '+event+' and listening.');
    }
} // end

module.exports = Subscriber;