# Create an Entity

Create a JSON file inside `modules/<module-name>/entities/`.

Example `customer.json`:

```json
{
  "name": "Customer",
  "tableName": "tabCustomer",
  "pk_type": "uuid",
  "fields": [
    {
      "fieldname": "full_name",
      "fieldtype": "Data",
      "reqd": 1,
      "unique": 1
    },
    {
      "fieldname": "email",
      "fieldtype": "Data",
      "reqd": 1
    }
  ]
}
```

Restart the server to load the new metadata.
