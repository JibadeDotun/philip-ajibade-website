import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'series', title: 'Series', type: 'string', options: { list: ['Urban Identity','Editorial','Portraits','Abstract','Travel'] } }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
  ]
})