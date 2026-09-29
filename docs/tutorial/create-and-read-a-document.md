# Create and Read a Document

Create a Customer:

```bash
curl -X POST http://localhost:3000/api/resource/Customer \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Doe","email":"john@example.com"}'
```

Copy the returned ID, then read the Customer:

```bash
curl http://localhost:3000/api/resource/Customer/RECORD_ID
```
