const KeenTracking = require('keen-tracking');

// Configure a client instance
const client = new KeenTracking({
  projectId: '5de0258fc9e77c0001c4d875',
  writeKey: '5F884E81FBA52624EC04E1628225662003E3D2E45A723EFFAD7A71D2D4163E960A0668FF61794E84BE2D156A6A348E6C3D9C9218FF739D93DCDCA6C501A2D723B39ED4B5D29411D33F5A812A34F342C911ED3281FF3D381EC3F9BE65F1BCDA6B'
});

// Record an event
client.recordEvent('purchases', {
  item: 'Avocado'
});