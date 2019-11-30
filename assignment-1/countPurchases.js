const KeenAnalysis = require('keen-analysis');

const client = new KeenAnalysis({
  projectId: 'projectID',
  readKey: 'readKey',
});

client
  .query({
    analysisType: 'count',
    eventCollection: 'purchases',
    timeframe: 'this_7_days',
  })
  .then(result => {
    console.log('Response', result)
  })
  .catch(err => {
    console.log('Error', err)
  });