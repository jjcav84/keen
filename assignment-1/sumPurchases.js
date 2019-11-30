const KeenAnalysis = require('keen-analysis');

const client = new KeenAnalysis({
  projectId: 'projectId',
  readKey: 'readKey',
});

client
  .query({
    analysisType: 'sum',
    eventCollection: 'purchases',
    target_property: 'user.age',
    timeframe: 'this_14_days',
  })
  .then(result => {
    console.log('Response', result)
  })
  .catch(err => {
    console.log('Error', err)
  });