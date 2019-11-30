const KeenTracking = require('keen-tracking');

// Configure a client instance
const client = new KeenTracking({
  projectId: 'projectId',
  writeKey: 'writeKey'
});

// Record an event
client.recordEvent('sales_status', {
  "keen": {
    "timestamp": "2019-11-28T15:05:58-08:00"
  },
  "id": "F9A3C577-9ECE-49F2-CAD8-35C1E81EF4EA",
  "lead_contact_date": "10-11-20",
  "leads_name": "Cruz Mooney",
  "closed_won": 18,
  "sales_demo_completed": 34,
  "open_opportunity": 2,
  "completed_activity": 88,
  "deal_size": 6873,
  "profit_margin": 56
});