const AWS = require("aws-sdk");
AWS.config.update({ region: "REGION" });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: 'ABC',
        timestamp: 1,
        title: 'New Title',
        content: 'New content'
    },
    ConditionExpression: '#t <> :t',
    ExpressionAttributeNames: {
        '#t': 'timestamp',
    }, ExpressionAttributeValues: {
        ':t': 1
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
})

// conditional write are idempotent meaning if we make same conditional writes to dynamodb many times only the first req will be considered
// example if we issue a put item to dynamodb only if a particular atrribue say sort key doesnot exist and due to some newtwork issue we didnot recive a repsonce back
// and because of this we do not know our req succeded of failed so can simply retry the req. and it will only succeed if the prev req did not go through


// when the condiitional check fails the dynamodb return a condional check failed exception and since this is an exception
// the dynamodb will not return the amount of WCU consumed in the req. however this does not mean that no WCU were consumed
// event if the condional expresion evaluates to false and the write op. was not performed the dynamodb will still consume WCUs for that req.