// export schema, export as object
export default {
  name: 'PCcase',
  title: 'PCCase',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      //url, unique name
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
        name: 'model',
        title: 'Model',
        type: 'string',
    },
    {
      name: 'sidewindow',
      title: 'Side Window',
      type: 'string',
    },
    {
      name: 'colour',
      title: 'Colour',
      type: 'string',
    },
    {
      name: 'bays',
      title: 'Bays',
      type: 'number',
    },
    {
      name: 'usbaccess',
      title: 'USB access',
      type: 'string',
    }
 
  ]
}