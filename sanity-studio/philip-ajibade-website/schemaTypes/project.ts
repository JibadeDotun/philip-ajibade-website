import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Interaction Design','Data Viz','Presentation','Service Design','Photography'] } }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Featured project', type: 'boolean' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'overview', title: 'Project Overview', type: 'text', rows: 5 }),
    defineField({ name: 'problem', title: 'The Problem', type: 'text', rows: 5 }),
    defineField({ name: 'outcome', title: 'The Outcome', type: 'text', rows: 5 }),
    defineField({ name: 'images', title: 'Project Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'role', title: 'My Role', type: 'string' }),
    defineField({ name: 'stats', title: 'Outcome Stats', type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string', title: 'Value' }, { name: 'label', type: 'string', title: 'Label' }] }] }),
  ]
})