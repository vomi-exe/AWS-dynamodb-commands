const AWS = require("aws-sdk");
AWS.config.update({ region: "REGION" });

const docClient = new AWS.DynamoDB.DocumentClient();


docClient.update({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'ABC',
        timestamp: 1
    },
    UpdateExpression: 'set #v = #v + :incr',
    ExpressionAttributeNames: {
        '#v': 'views'
    },
    ExpressionAttributeValues: {
        ':incr': 1
    }
}, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result);
    }
})


// ATOMIC Counters

// Increment/decrement atomically
// updateItem API
// Not Idempotent
// All requests are applied in order
// Not suitable for applications demanding high degree of accuracy