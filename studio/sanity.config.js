import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import photograph from "./schemaTypes/photograph.js";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
if (!projectId) throw new Error("Set SANITY_STUDIO_PROJECT_ID in studio/.env.local first.");

export default defineConfig({
  name: "philip-photography",
  title: "Philip Ajibade · Photography",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: [photograph] },
});
