import React from 'react'
import PropTypes from 'prop-types'

import styled, { theme } from '@nobia/zeus-components/lib/styled'
import {
  compose,
  lifecycle,
  withHandlers,
  branch,
  withState,
  renderNothing,
} from '@nobia/zeus-components/lib/recompose'
import { tracker } from '@nobia/zeus-components/lib/tracking'
import features from '@nobia/zeus-components/lib/features'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import { Icon } from '@nobia/zeus-components/lib/icons'
import withWishlistHandlers from './withWishlistHandlers'

const StyledIcon = styled(Icon)`
  display: block;
  margin-right: 10px;
  background-color: ${theme(
    'wishListButton.wishListBackground.backgroundColor'
  )};#eceded;
  padding-left: 0 !important;
  padding-top: 8px !important;
  width: ${theme('wishListButton.width')};
  > svg {
    width: ${theme('wishListButton.prodPageIconSize')};
  }
  :hover {
    cursor: pointer;
  }
  &[data-checked='true'] {
    > svg {
      filter: brightness(0) saturate(100%) invert(9%) sepia(17%) saturate(1569%)
        hue-rotate(145deg) brightness(91%) contrast(90%);
    }
  }
  ${(props) => props.theme.media.max.sm`
    right: 4px !important;
    width: 34px !important;
  `};
`
const moodboardEvent = new Event('moodboardUpdated')

const WishlistButton = ({
  isClient,
  inWishlist,
  toggleWishlist,
  className,
  small,
}) =>
  small ? (
    <StyledIcon
      data-cy="WishlistButton"
      data-checked={isClient && inWishlist}
      width={24}
      height={24}
      className={className}
      onClick={toggleWishlist}
      type={isClient && inWishlist ? 'heart-filled' : 'heart'}
      color="theme.button.colors.primaryBackground"
    />
  ) : (
    <StyledIcon
      data-cy="WishlistButton"
      data-checked={isClient && inWishlist}
      width={24}
      height={24}
      className={className}
      onClick={toggleWishlist}
      type={isClient && inWishlist ? 'heart-filled' : 'heart'}
      color="theme.button.colors.primaryBackground"
    />
  )

WishlistButton.propTypes = {
  isClient: PropTypes.bool,
  inWishlist: PropTypes.bool.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool,
}

WishlistButton.defaultProps = {
  isClient: false,
  className: undefined,
  small: false,
}

const wishlist = compose(
  injectIntl,
  withWishlistHandlers,

  // Force re-render on client to avoid mismatch from server state for wishlist buttons
  withState('isClient', 'setIsClient', null),
  lifecycle({
    componentDidMount() {
      this.props.setIsClient(true)
    },
  }),

  withHandlers({
    toggleWishlist:
      ({ addToWishlist, removeFromWishlist, inWishlist, product }) =>
      (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        if (inWishlist) {
          tracker.push({
            event: 'wishlistEvent',
            action: 'remove',
            wishlist: {
              product: product.id,
            },
          })
          removeFromWishlist(product.id)
        } else {
          tracker.push({
            event: 'wishlistEvent',
            action: 'add',
            wishlist: {
              product: product.id,
            },
          })
          if (!product.group) {
            // eslint-disable-next-line no-param-reassign
            product.group = location.pathname.split('/')[1]
          }
          addToWishlist(product)
        }
        window.dispatchEvent(moodboardEvent)
      },
    getString:
      ({ intl }) =>
      (id, defaultMessage, values) =>
        intl.formatMessage(
          {
            id: `app.wishlist.${id}`,
            defaultMessage,
          },
          values
        ),
  })
)

export default branch(
  () => features.wishlist === true,
  wishlist,
  renderNothing
)(WishlistButton)
