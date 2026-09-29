import db from "./database.js";
import { getMeta } from "./metadata.js";

const getKnexType = (fieldType) => {
  const typeMapping = {
    Data: "string",
    Text: "text",
    Int: "integer",
    Float: "float",
    Boolean: "boolean",
    Date: "date",
    Datetime: "datetime",
    Time: "time",
    JSON: "jsonb",
  };
  return typeMapping[fieldType] || "string";
};

/**
 * Synchronizes the database table schema with the Entity metadata.
 * Creates the table with the specified primary key strategy (autoincrement, uuid, or string),
 * and applies columns and constraints dynamically.
 * 
 * @async
 * @param {string} entityName - The exact name of the entity (e.g., "Customer").
 * @returns {Promise} True if the sync was successful.
 */
export async function syncTable(entityName) {
  const meta = getMeta(entityName);

  if (!meta) {
    throw new Error(`[Schema Error] Entity '${entityName}' not found in cache.`);
  }

  const tableName = meta.tableName || `tab${entityName}`;
  const fields = meta.fields || [];
  const pkType = meta.pk_type || "autoincrement";

  try {
    const exists = await db.schema.hasTable(tableName);

    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        if (pkType === "uuid") {
          table.uuid("id").primary().defaultTo(db.fn.uuid());
        } else if (pkType === "string") {
          table.string("id").primary();
        } else {
          table.increments("id").primary();
        }

        for (const field of fields) {
          const knexMethod = getKnexType(field.fieldtype);
          const column = table[knexMethod](field.fieldname);

          if (field.reqd) {
            column.notNullable();
          }

          if (field.unique) {
            column.unique();
          }

          if (field.default !== undefined) {
            column.defaultTo(field.default);
          }
        }

        table.timestamps(true, true);
      });

      console.log(`[+] Table '${tableName}' created successfully.`);
    } else {
      console.log(`[*] Table '${tableName}' already exists.`);
    }

    return true;
  } catch (error) {
    console.error(`[-] Failed to sync table for '${entityName}':`, error);
    throw error;
  }
}