import Fastify from "fastify";
import db from "./engine/database.js";
import { loadAllMetadata, getMeta } from "./engine/metadata.js";
import { syncTable } from "./engine/schema.js";
import { createDoc, getDoc } from "./engine/document.js";

const fastify = Fastify({ logger: false });

fastify.get("/api/meta/:entity", async (request, reply) => {
  const meta = getMeta(request.params.entity);
  if (!meta)
    return reply
      .code(404)
      .send({ error: `Entity '${request.params.entity}' not found` });
  return meta;
});

fastify.post("/api/meta/:entity/sync", async (request, reply) => {
  try {
    await syncTable(request.params.entity);
    return {
      success: true,
      message: `Table for '${request.params.entity}' synced successfully.`,
    };
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
});

fastify.post("/api/resource/:entity", async (request, reply) => {
  try {
    const doc = await createDoc(request.params.entity, request.body);
    return reply.code(201).send({ success: true, data: doc });
  } catch (error) {
    return reply.code(400).send({ error: error.message });
  }
});

fastify.get("/api/resource/:entity/:id", async (request, reply) => {
  try {
    const doc = await getDoc(request.params.entity, request.params.id);
    if (!doc) return reply.code(404).send({ error: "Document not found" });
    return { success: true, data: doc };
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
});

const start = async () => {
  try {
    console.log("Starting DD Framework...");
    await loadAllMetadata();
    await db.raw("SELECT 1");
    console.log("🔌 Connected to PostgreSQL successfully!");
    await fastify.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    console.error("[-] Error starting server:", err);
    process.exit(1);
  }
};

start();
