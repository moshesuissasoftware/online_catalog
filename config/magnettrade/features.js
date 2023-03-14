module.exports = {
  breadcrumbs: true,
  wishlist: false,
  defaults: {
    display: {
      brand: true,
      id: true,
      price: true,
      price_prefix: false,
      price_suffix: false,
      compare_price: false,
      price_disclaimer: false,
      variants: true,
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
  },
  categories: {},
  myAccount: false,
  emailConsent: false,
}
