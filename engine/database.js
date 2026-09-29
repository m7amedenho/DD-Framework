const { default: knex } = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});
export default db;
