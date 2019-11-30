const KeenAnalysis = require('keen-analysis');

const client = new KeenAnalysis({
  projectId: 'projectID',
  readKey: 'readKey',
});

client
  .query({
    analysisType: 'count',
    eventCollection: 'pageviews',
    timeframe: 'this_14_days',
  })
  .then(result => {
    console.log('Response', result)
  })
  .catch(err => {
    console.log('Error', err)
  });