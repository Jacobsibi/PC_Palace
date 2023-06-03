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
      name: 'gpuCardSlug',
      title: 'GPU',
      type: 'string',
    },
    {
      name: 'cpuSlug',
      title: 'CPU',
      type: 'string',
    },
    {
      name: 'mbSlug',
      title: 'Mother Board',
      type: 'string',
    },
    {
      name: 'ramSlug',
      title: 'RAM',
      type: 'string',
    },
    {
      name: 'storageSlug',
      title: 'Storage',
      type: 'string',
    },
    {
      name: 'osSlug',
      title: 'Operating System',
      type: 'string',
    },
    {
      name: 'coolerSlug',
      title: 'Cooler',
      type: 'string',
    },
    {
      name: 'psSlug',
      title: 'Power Supply',
      type: 'string',
    },
    {
      name: 'caseSlug',
      title: 'Case',
      type: 'string',
    },
  ],
};
