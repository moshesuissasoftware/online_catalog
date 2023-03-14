import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  compose,
  lifecycle,
  withState,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'
import { connect } from '@nobia/zeus-components/lib/redux'
// import { rem, withProp } from '@nobia/zeus-components/lib/styled'
// import { Headline } from '@nobia/zeus-components/lib/text'
import {
  getWishlist,
  clearWishlist as clearWishlistActionCreator,
} from '@nobia/zeus-components/lib/sharedState'
import { tracker } from '@nobia/zeus-components/lib/tracking'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'

import { Overlay, LightboxOverlay } from '@nobia/zeus-components/lib/overlay'
import { WishlistModal, ThankyouModal } from '../modals'
// import WishlistCounter from './WishlistCounter'

import sendWishlistRequest from '../../utils/sendWishlist'

const WISHLIST = 'WISHLIST'
const THANKYOU = 'THANKYOU'

// const getBreakpoint = extra =>
//   withProp('theme.breakpoints.lg', width => width + extra)
// const padding = rem(5)

// const Wrapper = styled.div`
//   position: fixed;
//   cursor: pointer;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   z-index: 3;
//   padding: ${padding} 0 ${padding} ${padding};
//   margin: -${padding} 0 -${padding} -${padding};
//   width: 100px;
//   transform: translateX(160px);
//   @media (max-width: ${getBreakpoint(320)}px) {
//     right: 0;
//     transform: none;
//   }
// `

// const StyledPreamble = styled(Headline)`
//   font-weight: ${theme('wishlist.summary.fontWeight')};
//   ${Wrapper} & {
//     text-align: center;
//     margin: 0;
//     width: 100%;
//     line-height: ${rem(15)};
//     font-size: ${rem(11)};
//     @media (max-width: ${getBreakpoint(200)}px) {
//       display: none;
//     }
//   }
// `

const WishlistSummary = ({
  wishlist,
  modalState,
  // openWishlist,
  closeWishlist,
  sendWishlist,
  // getString,
  // hasBackground,
}) => (
  <Fragment>
    {/* <Wrapper onClick={openWishlist} data-cy="WishlistSummary">
      <WishlistCounter count={wishlist.length} />
      {!hasBackground && (
        <StyledPreamble>{getString('saved_products')}</StyledPreamble>
      )}
    </Wrapper> */}
    <Overlay
      open={!!modalState}
      handleChange={state => !state.open && closeWishlist()}
      render={props => (
        <LightboxOverlay {...props}>
          {modalState === WISHLIST && (
            <WishlistModal
              {...props}
              wishlist={wishlist}
              confirm={sendWishlist}
            />
          )}
          {modalState === THANKYOU && <ThankyouModal {...props} />}
        </LightboxOverlay>
      )}
    />
  </Fragment>
)

WishlistSummary.propTypes = {
  wishlist: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  modalState: PropTypes.string,
  openWishlist: PropTypes.func.isRequired,
  closeWishlist: PropTypes.func.isRequired,
  sendWishlist: PropTypes.func.isRequired,
  getString: PropTypes.func.isRequired,
  hasBackground: PropTypes.bool,
}

WishlistSummary.defaultProps = {
  modalState: null,
  hasBackground: false,
}

const mapStateToProps = state => ({
  wishlist: getWishlist(state),
})

const mapDispatchToProps = dispatch => ({
  clearWishlist: () => dispatch(clearWishlistActionCreator()),
})

export default compose(
  injectIntl,
  withState('isClient', 'setIsClient', null),
  withState('modalState', 'setModalState', null),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.setIsClient(true)
    },
  }),
  withHandlers({
    openWishlist: ({ setModalState }) => () => {
      tracker.push({
        event: 'wishlistEvent',
        action: 'open',
      })
      setModalState(WISHLIST)
    },
    closeWishlist: ({ setModalState }) => () => {
      tracker.push({
        event: 'wishlistEvent',
        action: 'close',
      })
      setModalState(null)
    },
    sendWishlist: ({
      wishlist: products,
      setModalState,
      clearWishlist,
    }) => async (email, consent) => {
      tracker.push({
        event: 'wishlistEvent',
        action: 'send',
        wishlist: {
          count: products.length,
          products,
          email,
          consent,
        },
      })
      await sendWishlistRequest({
        email,
        products,
        consent,
      })
      clearWishlist()
      setModalState(THANKYOU)
    },
    getString: ({ intl }) => (id, defaultMessage, values) =>
      intl.formatMessage(
        {
          id: `app.wishlist.${id}`,
          defaultMessage,
        },
        values
      ),
  })
)(WishlistSummary)
