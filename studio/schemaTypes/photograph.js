import { defineField, defineType } from "sanity";

export default defineType({
  name: "photograph",
  title: "Photograph",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: rule => rule.required().max(120) }),
    defineField({ name: "image", title: "Photograph", type: "image", description: "Upload an edited web copy. Original proportions are preserved; cropping is not applied.", options: { accept: "image/jpeg,image/png,image/webp" }, validation: rule => rule.required() }),
    defineField({ name: "alt", title: "Image description", type: "text", rows: 3, description: "Briefly describe what someone would see. This is read by screen readers.", validation: rule => rule.required().max(500) }),
    defineField({ name: "location", title: "Location", type: "string", description: "For example: Manchester, UK. Avoid private addresses.", validation: rule => rule.required() }),
    defineField({ name: "year", title: "Year photographed", type: "number", validation: rule => rule.required().integer().min(1900).max(new Date().getFullYear()) }),
    defineField({ name: "collection", title: "Collection", type: "string", description: "Optional for now; supports future series pages." }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Lower numbers appear first. Use 10, 20, 30 so there is room to insert photographs.", initialValue: 10, validation: rule => rule.required().integer().min(0) }),
    defineField({ name: "fullWidth", title: "Full-width photograph", type: "boolean", description: "Use occasionally for a landscape image. Mobile stays one column.", initialValue: false }),
    defineField({ name: "visible", title: "Show in gallery", type: "boolean", description: "Publish the document AND enable this to show it on the website.", initialValue: true }),
  ],
  orderings: [{ title: "Gallery order", name: "galleryOrder", by: [{ field: "order", direction: "asc" }, { field: "title", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
