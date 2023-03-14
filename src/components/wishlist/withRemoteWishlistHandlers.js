import {
  compose,
  withProps,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import CustomerQuery from '../../graphql/CustomerQuery.graphql'
import AddProductForCustomerMutation from '../../graphql/AddProductForCustomerMutation.graphql'
import RemoveProductForCustomerMutation from '../../graphql/RemoveProductForCustomerMutation.graphql'

const readCustomerQuery = ({ store, customerId }) =>
  store.readQuery({ query: CustomerQuery, variables: { customerId } })

const writeCustomerQuery = ({ store, data, customerId }) =>
  store.writeQuery({ query: CustomerQuery, variables: { customerId }, data })

const mapProps = ({ data, product }) => {
  const wishlist = (data && data.customer && data.customer.products) || []

  return {
    inWishlist: !!wishlist.find(item => item.id === product.id),
  }
}

const addToWishlistHandler = ({ customerId, addProductMutation }) => product =>
  addProductMutation({
    variables: { input: { customerId, productId: product.id } },
    optimisticResponse: {
      addProductForCustomer: {
        customerId,
        product: {
          ...product,
          group: location.pathname.split('/')[1],
          favoritedAt: new Date().toISOString(),
          __typename: 'Product',
        },
        __typename: 'AddProductCustomerPayload',
      },
    },
    update: (store, response) => {
      const { addProductForCustomer } = response.data

      if (addProductForCustomer) {
        const responseProduct = addProductForCustomer.product

        const data = readCustomerQuery({ store, customerId })

        const updatedData = {
          ...data,
          customer: {
            ...data.customer,
            products: [...data.customer.products, responseProduct],
            notificationState: {
              ...data.customer.notificationState,
              hasNewNotifications: true,
            },
          },
        }
        writeCustomerQuery({ store, data: updatedData, customerId })
      }
    },
  })

const removeFromWishlistHandler = ({
  customerId,
  removeProductMutation,
}) => productId =>
  removeProductMutation({
    variables: { input: { customerId, productId } },
    optimisticResponse: {
      removeProductForCustomer: {
        productId,
        __typename: 'RemoveProductCustomerPayload',
      },
    },
    update: (store, response) => {
      const { removeProductForCustomer } = response.data

      if (removeProductForCustomer) {
        const data = readCustomerQuery({ store, customerId })

        const updatedData = {
          ...data,
          customer: {
            ...data.customer,
            products: data.customer.products.filter(
              product => product.id !== removeProductForCustomer.productId
            ),
          },
        }

        writeCustomerQuery({ store, data: updatedData, customerId })
      }
    },
  })

const withRemoteWishlistHandlers = compose(
  graphql(CustomerQuery, {
    options: ({ customerId }) => ({ variables: { customerId } }),
  }),
  withProps(mapProps),
  graphql(AddProductForCustomerMutation, { name: 'addProductMutation' }),
  graphql(RemoveProductForCustomerMutation, {
    name: 'removeProductMutation',
  }),
  withHandlers({
    addToWishlist: addToWishlistHandler,
    removeFromWishlist: removeFromWishlistHandler,
  })
)

export default withRemoteWishlistHandlers
