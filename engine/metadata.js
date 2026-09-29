import fs from "fs/promises";
import path from "path";

const ENTITY_CACHE = new Map();

/**
 * Scans all module directories to read Entity JSON files 
 * and loads them into an in-memory cache for fast retrieval.
 * 
 * @async
 * @returns {Promise} Resolves when all metadata is successfully cached.
 */
export async function loadAllMetadata() {
  const modulesDir = path.join(process.cwd(), "modules");
  const modules = await fs.readdir(modulesDir).catch(() => []);

  for (const mod of modules) {
    const entitiesPath = path.join(modulesDir, mod, "entities");
    const files = await fs.readdir(entitiesPath).catch(() => []);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const fileContent = await fs.readFile(
          path.join(entitiesPath, file), 
          "utf-8"
        );
        
        const data = JSON.parse(fileContent);

        if (data.name) {
          ENTITY_CACHE.set(data.name, data);
          console.log(`[x] Loaded metadata for entity: ${data.name}`);
        }
      }
    }
  }
}

/**
 * Retrieves the metadata of a specific Entity from the in-memory cache.
 * 
 * @param {string} entityName - The exact name of the entity (e.g., "Customer").
 * @returns {Object | undefined} The Entity JSON object, or undefined if not found.
 */
export const getMeta = (entityName) => ENTITY_CACHE.get(entityName);