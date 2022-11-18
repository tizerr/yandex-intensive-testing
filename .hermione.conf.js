module.exports = {
    baseUrl: 'http://localhost:3000/hw/store',
    browsers: {
        chrome: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    },
    waitTimeout: 5000
}