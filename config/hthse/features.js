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
    'kok-diskho': {
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
    'badrum-handfat': {
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
    'badrum-speglar': {
      filters: [],
      features: [],
    },
    'kok-blandare': {
      filters: ['color'],
      features: ['width', 'depth', 'height', 'material_primary', 'material'],
    },
    'badrum-blandare': {
      filters: ['color'],
      features: ['width', 'depth', 'height', 'material_primary', 'material'],
    },
    'kok-tillbehor': {
      filters: [],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    'badrum-tillbehor': {
      filters: [],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    'kok-hallar': {
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
    'kok-diskmaskine': {
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
    'kok-kylar-och-frysar': {
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
    'kok-kylskap': {
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
    'kok-mikrovagsungnar': {
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
    'kok-flaktar': {
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
    'badrum-tvattmaskiner-och-torktumlare': {
      filters: ['brand', 'color', 'features.width'],
      features: ['width', 'depth', 'height', 'material_primary'],
    },
    'kok-ugnar': {
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
