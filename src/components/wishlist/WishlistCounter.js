import React from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  withState,
  lifecycle,
} from '@nobia/zeus-components/lib/recompose'
import styled, {
  ifProp,
  css,
  rem,
  theme,
} from '@nobia/zeus-components/lib/styled'
import { Icon } from '@nobia/zeus-components/lib/icons'
import filterProps from '@nobia/zeus-components/lib/helpers/filterProps'

const StyledIcon = styled(props => (
  <Icon {...filterProps(props, ['wishlistAdded'])} />
))`
  display: block;
  position: relative;
  transform: scale(1);
  transition: transform 250ms;
  > svg {
    margin-right: 0;
  }
  ${ifProp(
    'wishlistAdded',
    css`
      transform: scale(1.5);
    `
  )};
`

const Counter = styled.div`
  text-align: center;
  position: absolute;
  line-height: ${rem(40)};
  font-size: ${rem(17)};
  top: 0;
  left: 0;
  width: 100%;
  color: ${theme('colors.backgroundPrimary')};
`

const WishlistCounter = ({ count, wishlistAdded, className }) => (
  <StyledIcon
    className={className}
    type="heart-filled"
    width={47}
    height={47}
    color="theme.button.colors.primaryBackground"
    data-cy="WishlistCount"
    wishlistAdded={wishlistAdded}
  >
    <Counter>{count}</Counter>
  </StyledIcon>
)

WishlistCounter.propTypes = {
  count: PropTypes.number.isRequired,
  wishlistAdded: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

WishlistCounter.defaultProps = {
  className: undefined,
}

export default compose(
  withState('isClient', 'setIsClient', null),
  withState('wishlistAdded', 'setWishlistAdded', false),
  lifecycle({
    componentDidMount() {
      this.props.setIsClient(true)
    },
    componentDidUpdate(oldProps) {
      if (oldProps.isClient && oldProps.count < this.props.count) {
        clearTimeout(this.timeout)

        this.props.setWishlistAdded(true)
        this.timeout = setTimeout(() => this.props.setWishlistAdded(false), 300)
      }
    },
  })
)(WishlistCounter)
