// Imports Pool from pg package
const { Pool } = require("pg");

// Creates database connection pool using DB_URL from .env
// When Integration testing, uses DB_TEST_URL
const db = new Pool({
  connectionString: process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_URL
    : process.env.DB_URL
})

// Exports database connection
module.exports = db;