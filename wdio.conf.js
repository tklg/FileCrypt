exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        './test/specs/tests.web.js'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome'
    }],
    sync: true,
    logLevel: 'error',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:9000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-register']
    },
    before: function() {
        var chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        chai.Should();
    }
}
