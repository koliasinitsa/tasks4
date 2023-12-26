const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sinitsa",
  host: "localhost",
  port: 5432,
  database: "task4"
});

module.exports = pool;