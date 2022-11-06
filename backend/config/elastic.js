const { Client } = require("@elastic/elasticsearch");

const ELASTIC_CLOUD_ID = process.env["ELASTIC_CLOUD_ID"];
const ELASTIC_USERNAME = process.env["ELASTIC_USERNAME"];
const ELASTIC_PASSWORD = process.env["ELASTIC_PASSWORD"];

const client = new Client({
  cloud: { id: ELASTIC_CLOUD_ID },
  auth: { username: ELASTIC_USERNAME, password: ELASTIC_PASSWORD },
});

module.exports = client;