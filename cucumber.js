module.exports = {
  default: {
    paths: ['e2e-tests/features/**/*.feature'],
    require: ['e2e-tests/steps/**/*.js', 'e2e-tests/support/**/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    timeout: 30000
  }
};