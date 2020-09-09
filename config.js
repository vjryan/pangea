module.exports = {

    http: {
        listen_port: 8001,
    },
    redis: {
        hostname: 'localhost',
        port: 6379,
    },
    axios : {
        config: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
};