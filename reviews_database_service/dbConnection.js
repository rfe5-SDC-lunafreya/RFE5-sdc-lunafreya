var psql = require('pg');

var connectionString = "localhost \
port=5432 \
user=michaelharfenist \
dbname=reviews "

var pgClient = new psql.Client(connectionString)

pgClient.connect();

module.exports = pgClient;