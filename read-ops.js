const AWS = require('aws-sdk');
AWS.config.update({ region: 'REGION' });
const docClient = new AWS.DynamoDB.DocumentClient();

//get operation to get a single item from the table

docClient.get({
    TableName: 'td_notes_test',
    Key: {
        user_id: 'A',
        timestamp: 1,
    }
},
    (err, result) => {
        if (err) {
        console.log(err)
        } else {
            console.log(result)
    }
})

// query operation

//for seconday index add another column as IndexName: ""
// for using a filter add FilterExpression in the Query

docClient.query({
    TableName: 'td_notes_test',
    KeyConditionExpression: 'user_id = :uid',
    ExpressionAttributeValues: {
        ':uid': 'A'
    }
}, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
})


// Scan operation with a filterExpession

docClient.scan({
    TableName: 'td_notes_test',
    FilterExpression: 'cat = :cat',
    ExpressionAttributeValues: {
        ":cat": "general"
    }
}, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
})


// Batch get items

docClient.batchGet({
    RequestItems: {
        'td_notes_test': {
            Keys: [
                {
                    user_id: 'A',
                    timestamp: 1
                },
                {
                    user_id: 'B',
                    timestamp: 2
                },
            ],
        },
        'td_notes_sdk': {
            Keys: [
                {
                    user_id: '111',
                    timestamp: 5
                }
            ]
        }
    }

}, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(result,null,2))
    }
})