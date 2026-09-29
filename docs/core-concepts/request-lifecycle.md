# Request Lifecycle

When a client creates a Customer:

1. `server.js` receives the request.
2. `document.js` gets the Customer metadata.
3. Required fields are checked.
4. Knex inserts the data into PostgreSQL.
5. The API returns the new record.
