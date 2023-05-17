// export schema, export as object
export default {
  name: 'motherboard',
  title: 'Motherboard',
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
      name: 'cpusocket',
      title: 'CPU Socket',
      type: 'string',
    },
    {
      name: 'ramslots',
      title: 'RAM Slots',
      type: 'number',
    },
    {
      name: 'memoryctype',
      title: 'Memory Type',
      type: 'string',
    },
    {
      name: 'wifi',
      title: 'Wifi',
      type: 'string',
    },
    {
      name: 'bluetooth',
      title: 'Bluetooth',
      type: 'string',
    }
 
  ]
}