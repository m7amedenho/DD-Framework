# Sync a Database Table

Start the server, then send this request:

```bash
curl -X POST http://localhost:3000/api/meta/Customer/sync
```

The framework creates `tabCustomer` when the table does not exist.
