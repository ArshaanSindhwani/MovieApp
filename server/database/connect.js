const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.DB_URL
});

module.exports = db;
