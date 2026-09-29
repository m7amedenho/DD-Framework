# Entity Structure

An entity file contains these main properties:

```json
{
  "name": "Customer",
  "tableName": "tabCustomer",
  "pk_type": "uuid",
  "fields": []
}
```

- `name`: The name used by the API.
- `tableName`: The PostgreSQL table name.
- `pk_type`: The ID type.
- `fields`: The entity fields.
