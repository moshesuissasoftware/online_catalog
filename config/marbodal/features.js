module.exports = {
  breadcrumbs: true,
  wishlist: true,
  defaults: {
    display: {
      brand: true,
      id: true,
      price: true,
      price_prefix: false,
      price_suffix: false,
      compare_price: true,
      price_disclaimer: false,
      related_products: true,
      variants: false,
      filters: true,
      sorting: false,
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
  },
  categories: {},
  emailConsent: false,
}
