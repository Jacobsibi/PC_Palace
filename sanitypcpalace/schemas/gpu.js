// export schema, export as object
export default {
  name: 'gpu',
  title: 'GPU',
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
      name: 'memorysize',
      title: 'Memory Size',
      type: 'string',
    },
    {
      name: 'clockspeed',
      title: 'Clock Speed',
      type: 'string',
    },
    {
      name: 'displayports',
      title: 'Display Ports',
      type: 'number',
    },
    {
      name: 'hdmiports',
      title: 'HDMI Ports',
      type: 'number',
    }
 
  ]
}