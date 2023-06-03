// export schema, export as object
export default {
  name: 'buildLow',
  title: 'BuildLow',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'graphicsCard',
      title: 'Graphics Card',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'gpuSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'processor',
      title: 'Processor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'cpuSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'motherboard',
      title: 'Motherboard',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'mbSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'memory',
      title: 'Memory',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'ramSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'storage',
      title: 'Storage',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'storageSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'cooler',
      title: 'Cooler',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'coolerSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'windows',
      title: 'Windows',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'osSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'powerSupply',
      title: 'Power Supply',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'psSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'case',
      title: 'Case',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        { 
          name: 'details',
          title: 'Details',
          type: 'string',
        },
        {
          //url, unique name
          name: 'caseSlug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 90,
          },
        },
        {
          name: 'image',
          title: 'Image',
          type: 'array',
          of: [{ type: 'image' }],
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};
