module.exports = {
  breadcrumbs: true,
  defaults: {
    display: {
      brand: true,
      price: true,
      price_prefix: false,
      price_suffix: false,
      compare_price: true,
      variants: false,
      filters: true,
      sorting: true,
      features: true,
      tabs: {
        description: true,
        technical_details: true,
        instructions: true,
      },
    },
    sorting: [
      {
        key: 'price',
        ascending: true,
        value: 'price_asc',
      },
      {
        key: 'price',
        ascending: false,
        value: 'price_desc',
      },
    ],
    features: ['depth', 'width', 'height'],
    filters: ['brand', 'color', 'subCategory'],
  },
  categories: {
    sinks: {
      filters: ['color'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'material',
        'sink_type',
      ],
    },
    mirrors: {
      filters: [],
      features: [],
    },
    taps: {
      filters: ['color'],
      features: ['width', 'depth', 'height', 'material_primary', 'material'],
    },
    accessories: {
      filters: [],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    hobs: {
      filters: ['brand', 'color', 'features.width'],
      features: [
        'width',
        'depth',
        'height',
        'number_of_zones',
        'control_type',
        'burner_types',
      ],
    },
    dishwashers: {
      filters: ['brand', 'features.energy_rating'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'number_of_programmes',
        'number_of_place_settings',
        'water_consumption',
        'energy_rating',
        'dba',
      ],
    },
    freezers: {
      filters: ['brand', 'color', 'features.energy_rating'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'energy_rating',
        'energy_usage',
        'capacity',
      ],
    },
    refrigerators: {
      filters: ['brand', 'color', 'features.energy_rating'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'energy_rating',
        'energy_usage',
        'capacity',
      ],
    },
    microwaves: {
      filters: ['brand', 'color', 'features.width'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'material',
        'temperature',
        'capacity',
      ],
    },
    fans: {
      filters: ['brand', 'color', 'features.width'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'material',
        'number_of_speeds',
        'lighting_type',
      ],
    },
    'washers-dryers': {
      filters: ['brand', 'color', 'features.width'],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    ovens: {
      filters: ['brand', 'color', 'features.energy_rating'],
      features: [
        'width',
        'depth',
        'height',
        'material_primary',
        'temperature',
        'capacity',
        'energy_rating',
        'control_type',
      ],
    },
  },
}