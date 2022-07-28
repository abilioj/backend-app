const { db } = require("./.env");

module.exports = {
  client: "postgresql",
  connection: db,
  pool: {
    min: 2,
    max: 6,
    //"createTimeoutMillis": 3000,
    //"acquireTimeoutMillis": 30000,
    //"idleTimeoutMillis": 30000,
    //"reapIntervalMillis": 1000,
    //"createRetryIntervalMillis": 100,
    propagateCreateError: false, // <- default is true, set to false
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
