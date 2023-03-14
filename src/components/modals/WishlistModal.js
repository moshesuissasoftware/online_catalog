import Button from '@nobia/zeus-components/lib/buttons'
import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import { featureIf } from '@nobia/zeus-components/lib/features'
import { CheckBox, InputField } from '@nobia/zeus-components/lib/forms'
import { Container } from '@nobia/zeus-components/lib/grid'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import { Icon } from '@nobia/zeus-components/lib/icons'
import {
  compose,
  withHandlers,
  withState,
} from '@nobia/zeus-components/lib/recompose'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import { Headline, Paragraph } from '@nobia/zeus-components/lib/text'
import PropTypes from 'prop-types'
import React from 'react'

import { FEATURE_EMAIL_CONSENT } from '../../constants'
import validate from '../../utils/validateEmail'
import ProductCard from '../product-card'
import { ProductColumn, ProductRow } from '../product-grid'
import { WishlistCounter } from '../wishlist'
import Modal from './Modal'
import PrivacyPolicy from './PrivacyPolicy'

const StyledProductRow = styled(ProductRow)`
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
`

const ArrowIcon = styled(Icon).attrs({
  type: 'arrow-right',
  width: 18,
  height: 18,
})`
  svg {
    margin-bottom: -0.35em;
  }
`

const InputWrapper = styled.div`
  svg {
    display: none;
  }

  > span {
    margin-bottom: ${rem(15)};
  }
`

const StyledCheckbox = styled(CheckBox)`
  display: block;
  margin: 0 auto ${rem(20)};
  text-align: left;
  ${props => props.theme.media.min.sm`
    width: ${rem(300)};
  `};
`

const StyledInput = styled(InputField)`
  width: 100%;
  font-size: ${rem(16)};
  ${props => props.theme.media.min.sm`
    width: ${rem(300)};
    max-width: ${rem(300)};
  `};
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${rem(15)};
  margin-right: 0;
  ${props => props.theme.media.min.sm`
    width: ${rem(300)};
  `};
`

const StyledContainer = styled(Container)`
  ${props => props.theme.media.max.sm`
    padding-left: 0;
    padding-right: 0;
  `};
`

const WishlistModal = ({
  wishlist,
  confirm,
  getString,
  email,
  valid,
  consent,
  handleChange,
  handleConsentChange,
  setClosed,
  ...props
}) => (
  <Modal {...props} setClosed={setClosed}>
    <WishlistCounter count={wishlist.length} />
    <Headline>{getString('title', 'Saved products')}</Headline>
    <Paragraph>{getString('message')}</Paragraph>
    <InputWrapper>
      <StyledInput
        type="email"
        valid={!email || valid}
        placeholder={getString('placeholder')}
        value={email}
        onChange={handleChange}
      />
    </InputWrapper>
    {featureIf(
      FEATURE_EMAIL_CONSENT,
      <StyledCheckbox
        name="consent"
        value={consent}
        onChange={handleConsentChange}
        label={getString('consent', 'Yes I love newsletters!')}
      />
    )}
    <StyledButton
      disabled={wishlist.length === 0 || !valid}
      data-cy="ConfirmButton"
      onClick={() => confirm(email, consent)}
    >
      <ArrowIcon>{getString('confirm')}</ArrowIcon>
    </StyledButton>
    <PrivacyPolicy />
    <StyledContainer>
      <ErrorBoundary name="saved_products">
        <StyledProductRow>
          {wishlist.map(product => (
            <ProductColumn size={6} sm={4} md={3} key={product.id}>
              <div onClick={setClosed}>
                <ProductCard product={product} showBadge={false} />
              </div>
            </ProductColumn>
          ))}
        </StyledProductRow>
      </ErrorBoundary>
    </StyledContainer>
  </Modal>
)

WishlistModal.propTypes = {
  wishlist: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  confirm: PropTypes.func.isRequired,
  getString: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  consent: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleConsentChange: PropTypes.func.isRequired,
  setClosed: PropTypes.func.isRequired,
}

export default compose(
  injectIntl,
  withState('email', 'setEmail', ''),
  withState('valid', 'setValid', false),
  withState('consent', 'setConsent', false),
  withHandlers({
    handleConsentChange: ({ setConsent }) => event =>
      setConsent(event.target.checked),
    handleChange: ({ setEmail, setValid }) => event => {
      setEmail(event.target.value)
      setValid(validate(event.target.value))
    },
    getString: ({ intl }) => (id, defaultMessage, values) =>
      intl.formatMessage(
        {
          id: `app.modals.wishlist.${id}`,
          defaultMessage,
        },
        values
      ),
  })
)(WishlistModal)
