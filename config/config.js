const { createClient } = require('@libsql/client');
require('dotenv').config();

const client = createClient(
  {
    url: process.env.TURSO_DATABASE_URL,
    authToken:process.env.TURSO_AUTH_TOKEN,
  }
);
module.exports = client;
