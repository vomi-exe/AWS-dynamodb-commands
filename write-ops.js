const AWS = require("aws-sdk");
AWS.config.update({ region: "REGION" });

const docClient = new AWS.DynamoDB.DocumentClient();

// put items into the table

docClient.put({
    TableName: "td_notes_sdk",
    Item: {
        user_id: "bb",
        timestamp: 231187,
        title: "changed Content",
        content: "change content"
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
})

// update item in the table


docClient.update({
    TableName: "td_notes_sdk",
    Key: {
        user_id: "bb",
        timestamp: 231187,
    },
    UpdateExpression: 'set #t = :t',
    ExpressionAttributeNames: {
        '#t': 'title'
    },
    ExpressionAttributeValues: {
        ':t': "updadated title"
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
})

// delete an existing item


docClient.delete({
    TableName: "td_notes_sdk",
    Key: {
        user_id: "bb",
        timestamp: 231187,
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
})

// batch write items into the table

docClient.batchWrite({
    RequestItems: {
        'td_notes_sdk': [
            {
                DeleteRequest: {
                    Key: {
                        user_id: "bb",
                        timestamp: 23165
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: "111",
                        timestamp: 5,
                        title: "item 5",
                        content: "content 5"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: "222",
                        timestamp: 4,
                        title: "item 4",
                        content: "content 4"
                    }
                }
            }
        ]
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
})