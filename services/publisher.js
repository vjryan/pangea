
class Publisher{
    constructor(emitter){
        this.emitter = emitter;
    }

    publish(event, topic, message){    
        // publish/emit message
        this.emitter.emit(event, topic, JSON.stringify(message));
    }
}

module.exports = Publisher;