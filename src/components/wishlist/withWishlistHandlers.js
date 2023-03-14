import { withAuth } from '@nobia/zeus-components/lib/auth'
import {
  compose,
  branch,
  withProps,
} from '@nobia/zeus-components/lib/recompose'
import withLocalWishlistHandlers from './withLocalWishlistHandlers'
import withRemoteWishlistHandlers from './withRemoteWishlistHandlers'

const mapAuthProps = ({ auth }) => ({
  isAuthenticated: auth.status === 'authenticated',
  customerId: auth.profile != null ? auth.profile.customer_id : null,
})

const withWishlistHandlers = compose(
  withAuth,
  withProps(mapAuthProps),
  branch(
    props => props.isAuthenticated && props.customerId,
    withRemoteWishlistHandlers,
    withLocalWishlistHandlers
  )
)

export default withWishlistHandlers
