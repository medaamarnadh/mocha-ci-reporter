const request = require('sync-request')

exports.sendWebhook = async function(testReport, options) {
    try {
    const blocks = []
    const slackReport = {}
    slackReport.text = `*${testReport.title}*`
    let testResultFields = []
    testResultFields.push({
        'type': 'mrkdwn',
        'text':'*Total:* '+testReport.total
    })

    testResultFields.push({
        'type':'mrkdwn',
        'text':'*Passed:* '+ testReport.passed
    })

    testResultFields.push({
        'type':'mrkdwn',
        'text':'*Failed:* '+ testReport.failures
    })    
    if(testReport.failedTests && testReport.failedTests.length) {
        blocks.push({
            type: 'section',
            'text':{
                type: 'mrkdwn',
                text:'*Failure tests are:*'
            }
        })
        testReport.failedTests.forEach(ele => {            
            let text = `*${ele.test.parent.title}     ${ele.test.title}* \n> ${ele.err.stack.replace(/\n/g, "\n>")} \n>`
            blocks.push({
                type: 'section',
                'text':{
                    type: 'mrkdwn',
                    text: text,
                }                
            })    
        })
    }

    slackReport.attachments = [{
        blocks: [{
            type: 'section',
            fields: testResultFields
        }],
        color: '#36a64f'
    },{
        blocks: blocks,
        color: '#d50200'
    }]
    slackReport.channel = options.channel        
    const result =  request('POST', options.url, {
        json: {
            ...slackReport
        }
    })    
    return result    
} catch (err) {    
    console.log(err)
}
}