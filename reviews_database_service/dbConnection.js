const {Pool} = require('pg')
const dotenv = require('dotenv');
dotenv.config({path: 'reviews_database_service/.env'});

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool
.connect()
.then(() => {
  console.log('Connected to postgreSQL');
})
.catch(err => {
  console.log('error connecting: ', err);
});

// const pool = new Pool();

exports.pool = pool;


//const pool = new Pool();
// (async function() {
//   const client = await pool.connect()
//   await client.query('SELECT NOW ()')
//   client.release()
// })
// pool.query('SELECT reviewer_email FROM reviews WHERE id = 7', (err, res) => {
//   console.log(err, res)
//   pool.end()
// }) //? test confirmed
// console.log('pg_user',process.env.PG_USER);