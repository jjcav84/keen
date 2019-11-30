const KeenAnalysis = require('keen-analysis');

const client = new KeenAnalysis({
  projectId: 'projectId',
  readKey: 'readKey'
});

client
  .query({
    analysisType: 'extraction',
    eventCollection: 'purchases',
    timeframe: "this_14_days",
    propertyNames: [],
    latest: "5",
  })
  .then(result => {
    console.log('Response', result)
  })
  .catch(err => {
    console.log('Error', err)
  });