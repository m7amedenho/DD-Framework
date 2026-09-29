# Metadata-Driven Architecture

The framework uses JSON metadata instead of writing a table and API for every entity.

One entity file describes:

- The entity name
- The database table name
- The primary key type
- The fields
- The field rules

The backend engines use the same metadata for tables, validation, and API operations.
