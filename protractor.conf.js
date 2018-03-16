// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'build': 'protractor-browserstack',
    'name': 'angular-forms',
    'resolution': '1024x768',
    'browserstack.debug': 'true'
  },
  // directConnect: true,
  // baseUrl: 'http://localhost:4200/',
  baseUrl: 'http://localhost:49152/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
