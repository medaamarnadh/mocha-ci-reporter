var mocha = require('mocha')
const slack = require('./lib/slack')
module.exports = MyReporter;


function MyReporter(runner, options) {
  mocha.reporters.Base.call(this, runner);
  var passes = 0;
  var failures = 0;
  const failedTests = []

  runner.on('pass', function(test) {
    passes++;
    console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err) {
    failures++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
    failedTests.push({
      test,
      err
    })
  });

  runner.on('end', async () => {
    console.log('end: %d/%d', passes, passes + failures)
    await sendReport()
  });

  let sendReport = async function() {
    try {
    let report = { }    
    let reporterOptions = options.reporterOptions    
    report.title = reporterOptions.title
    report.total = passes + failures
    report.failures = failures
    report.passed = passes 
    report.failedTests = failedTests    
    // Slack notifications
    if(reporterOptions.slack) {
      if(reporterOptions.slack.url && reporterOptions.slack.username && reporterOptions.slack.channel) {
        const result = await slack.sendWebhook(report, reporterOptions.slack)
        return true
      }
    }
  }catch (err) {
    throw err
  }
    

  }


}
