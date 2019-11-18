# mocha-ci-reporter
## Table of contents
### Introduction 
This is a Node.js module that gives detailed report about your tests excution on any CI server such as Jenkins, CircleCI etc.
### Features 
- Easy report to the slack channel by using webhooks
- Test run summary
- List of failed test along with their suite name
- Error stack of the failed test

### How to use 
Install the module by using below command 
`npm install mocha-ci-reporter`
It is recommended to use mocha programitically to configure your report in efficient way. Please take a look at below code.

	const Mocha = require('mocha')
    const mocha = new Mocha({
        reporter: 'mocha-ci-reporter',
        reporterOptions:{
            slack: {
                url:'https://hooks.slack.com/services/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',
                channel: 'general',
                username: 'medaamarnadh'
            },
            title: 'Statement And Payments Runner'            
        },
    })
    
    const testDir = process.cwd()+'/test/'
    const testSpecs = [
        'user/signup.js',
        'user/login.js',
        'user/verification.js'
    ]
    testSpecs.forEach(filePath => {
        mocha.addFile(path.join(testDir, filePath))
    })
    `

The example output for the slack report looks like below.
![ The image is not supporting](https://drive.google.com/file/d/1TWUzs2DbqyLI8lhldXARLm4O3SS_cOKd/view?usp=sharing)


    
    
    