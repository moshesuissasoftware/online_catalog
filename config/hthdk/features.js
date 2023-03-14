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
    'kokken-vaske': {
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
    'bad-handvaske': {
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
    'bad-spejle': {
      filters: [],
      features: [],
    },
    'kokken-armaturer': {
      filters: ['color'],
      features: ['width', 'depth', 'height', 'material_primary', 'material'],
    },
    'bad-armaturer': {
      filters: ['color'],
      features: ['width', 'depth', 'height', 'material_primary', 'material'],
    },
    'kokken-tilbehor': {
      filters: [],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    'bad-tilbehor': {
      filters: [],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    'kokken-kogeplader': {
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
    'kokken-opvaskemaskiner': {
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
    'kokken-kole-fryseskabe': {
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
    'kokken-koleskabe': {
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
    'kokken-mikroovne': {
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
    'kokken-emhaetter': {
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
    'bad-vaskemaskiner-og-torretumblere': {
      filters: ['brand', 'color', 'features.width'],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    'kokken-ovne': {
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
