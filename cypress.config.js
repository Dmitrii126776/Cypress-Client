const {defineConfig} = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
    chromeWebSecurity: false,
    pageLoadTimeout: 15000,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    viewportHeight: 720,
    viewportWidth: 1280,
    video: false,
    retries: {
        runMode: 1,
        openMode: 0
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        reportPageTitle: 'cypress-client',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        autoOpen: true,
    },
    e2e: {
        baseUrl: 'https://client-mern-auth.netlify.app',
        env: {
            requestMode: true,
            urlServer: process.env.URL_SERVER,
        },
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('cypress-mochawesome-reporter/plugin')(on);

        },
    },
});
