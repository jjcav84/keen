const KeenAnalysis = require('keen-analysis');

const client = new KeenAnalysis({
  projectId: 'projectId',
  readKey: 'readKey',
});

client
  .query({
    analysisType: 'sum',
    eventCollection: 'pageviews',
    target_property: 'ad.campaign_id',
    timeframe: 'this_1_days',
  })
  .then(result => {
    console.log('Response', result)
  })
  .catch(err => {
    console.log('Error', err)
  });