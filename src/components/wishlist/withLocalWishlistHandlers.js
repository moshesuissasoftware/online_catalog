import { connect, bindActionCreators } from '@nobia/zeus-components/lib/redux'
import {
  addWishlist,
  removeWishlist,
  getWishlistIds,
} from '@nobia/zeus-components/lib/sharedState'

const mapStateToProps = (state, { product }) => ({
  inWishlist: getWishlistIds(state).includes(product.id),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToWishlist: addWishlist,
      removeFromWishlist: removeWishlist,
    },
    dispatch
  )

const withLocalWishlistHandlers = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withLocalWishlistHandlers
