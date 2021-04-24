const { Pool } = require('pg');

const PG_URI = "postgres://ujneeeir:fnSCEBl8hgf4INkhrJll4J4AxvbitKqp@queenie.db.elephantsql.com:5432/ujneeeir";

const pool = new Pool({
  connectionString: PG_URI,
});

//for future devs: schema for the above db will be found at
//github.

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};