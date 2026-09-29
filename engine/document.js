import db from "./database.js";
import { getMeta } from "./metadata.js";

function validateData(meta, data) {
  const fields = meta.fields || [];

  for (const field of fields) {
    const isMissing =
      data[field.fieldname] === undefined ||
      data[field.fieldname] === null ||
      data[field.fieldname] === "";

    if (field.reqd && isMissing) {
      throw new Error(
        `[Validation Error] Field '\({field.fieldname}' is required for Entity '\){meta.name}'.`,
      );
    }
  }
}

export async function createDoc(entityName, data) {
  const meta = getMeta(entityName);

  if (!meta) {
    throw new Error(
      `[Document Error] Entity '${entityName}' not found in cache.`,
    );
  }

  const tableName = meta.tableName || `tab${entityName}`;

  validateData(meta, data);

  try {
    const [insertedRecord] = await db(tableName).insert(data).returning("*");
    console.log(
      `[+] Document created in '\({tableName}' with ID:\){insertedRecord.id}`,
    );
    return insertedRecord;
  } catch (error) {
    console.error(
      `[-] Failed to create document in '${tableName}':`,
      error.message,
    );
    throw error;
  }
}

export async function getDoc(entityName, id) {
  const meta = getMeta(entityName);
  if (!meta)
    throw new Error(`[Document Error] Entity '${entityName}' not found.`);

  const tableName = meta.tableName || `tab${entityName}`;

  const record = await db(tableName).where({ id }).first();
  return record;
}
