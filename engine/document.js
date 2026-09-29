/**
 * Validates the incoming data against the Entity's fields definition.
 * Checks for required fields and basic constraints.
 *
 * @param {Object} meta - The Entity metadata JSON.
 * @param {Object} data - The payload to validate.
 * @throws {Error} If validation fails (e.g., missing required fields).
 */
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

/**
 * Creates a new record in the database for the given entity.
 *
 * @async
 * @param {string} entityName - The name of the Entity (e.g., "Customer").
 * @param {Object} data - The data payload to insert.
 * @returns {Promise} The inserted record.
 */
