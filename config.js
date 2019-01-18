let config = {
    httpAddress: '0.0.0.0',
    httpPort: 8086,
    logger: {
        logLevel: 'debug',
    },
    corsWhiteList: ['*'],
}

config.router = require('./router');

module.exports = config;
