const AWS = require('aws-sdk');
AWS.config.update({ region: 'REGION' })

const docClient = new AWS.DynamoDB.DocumentClient();

function scanPage(params) {
    return new Promise((resolve, reject) => {
      docClient.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  
  // Example usage:
  const pageSize = 3;
  let lastEvaluatedKey = null;
  
  async function fetchPages() {
    let pageData;
  
    do {
      try {
        const params = {
          TableName: 'td_notes_test',
          Limit: pageSize,
          ExclusiveStartKey: lastEvaluatedKey,
        };
  
        const result = await scanPage(params);
        pageData = result.Items;
  
        // Replace this function with your logic to display the data on the page
        displayPage(pageData);
  
        lastEvaluatedKey = result.LastEvaluatedKey;
      } catch (error) {
        console.error('Error fetching page:', error);
        break;
      }
    } while (lastEvaluatedKey);
  }
  
  function displayPage(pageData) {
    // Replace this function with your logic to display the data on the page
    console.log(pageData);
}
  
fetchPages();