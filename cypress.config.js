const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.impulsoprevine.org',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
