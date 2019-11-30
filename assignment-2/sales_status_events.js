const KeenTracking = require('keen-tracking');

// Configure a client instance
const client = new KeenTracking({
  projectId: 'projectId',
  writeKey: 'writeKey'
});
// Record an event
client.recordEvent('sales_status', {
  "keen": {
    "timestamp": "2019-11-28T01:58:53-08:00",
  },
  "id": "750DF762-EA3D-5863-D287-5850FFE615FA",
  "lead_contact_date": "06-18-20",
  "leads_name": "Wade Reilly",
  "closed_won": false,
  "sales_demo_completed": false,
  "open_opportunity": false,
  "completed_activity": false,
  "deal_size": 11701,
  "profit_margin": "0.03"
});