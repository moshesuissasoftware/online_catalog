import settings from '@nobia/zeus-components/lib/settings'
import getCategoryFeature from './getCategoryFeature'

const transformProduct = product => ({
  productid: product.id,
  title: product.name,
  price: getCategoryFeature(product.filterPage.id)('display.price')
    ? product.price
    : undefined,
  image: product.images[0],
  product_page_url: [
    `${window.location.protocol}//${window.location.host}`,
    product.filterPage.group,
    product.filterPage.slug,
    product.slug,
    '',
  ].join('/'),
})

const getPayload = ({ email, products, consent }) => ({
  customer_email: email,
  contact_me: consent,
  products: products.map(transformProduct),
  triggered_by: 'user',
})

const getInit = payload => ({
  method: 'PUT',
  mode: 'cors',
  headers: {
    'Content-type': 'application/json',
  },
  body: payload,
})

const sendWishlist = ({ email, products, consent }) =>
  fetch(
    settings.customerIOUrl,
    getInit(JSON.stringify(getPayload({ email, products, consent })))
  )

export default sendWishlist
