import React from 'react'
import PropTypes from 'prop-types'
import styled, { prop, rem } from '@nobia/zeus-components/lib/styled'
import { Paragraph, PageTitle } from '@nobia/zeus-components/lib/text'
import { withTranslation, asPrice } from '@nobia/zeus-components/lib/i18n'

const Wrapper = styled.div`
  margin-bottom: ${rem(15)};
`

const PricePrefix = withTranslation('app.product')('span')
const PriceSuffix = withTranslation('app.product')(
  Paragraph.withComponent('span')
)
const PriceSpan = asPrice(styled(PageTitle.withComponent('span'))`
  font-size: ${prop('theme.productCard.price.fontSize')};
  color: ${prop('theme.price.color')};
  @media (max-width: 450px) {
    font-size: ${prop('theme.productCard.price.mobile.fontSize')};
  }
`)

const StyledPriceDisclaimer = styled(Paragraph)`
  margin-bottom: 0;
  color: #7a7a7a;
`
const Label = withTranslation('app.product')('span')
const ComparePrice = asPrice('span')

const Price = ({
  price,
  comparePrice,
  showPrefix,
  showSuffix,
  showDisclaimer,
  showDisclaimerTwo,
  className,
}) => (
  <Wrapper itemScope itemType="http://schema.org/Offer" className={className}>
    {!!price && (
      <div>
        {showPrefix && <PricePrefix intlKey="price_prefix" />}
        <PriceSpan style={{ fontSize: '24px', color: '#333' }} itemProp="price">
          {price}
        </PriceSpan>
        {showSuffix && <PriceSuffix intlKey="price_suffix" />}
      </div>
    )}
    {!!comparePrice && (
      <StyledPriceDisclaimer>
        <Label intlKey="compare_price" />{' '}
        <ComparePrice>{comparePrice}</ComparePrice>
      </StyledPriceDisclaimer>
    )}
    {!!showDisclaimer && (
      <StyledPriceDisclaimer>
        <Label intlKey="price_disclaimer" />
      </StyledPriceDisclaimer>
    )}
    {!!showDisclaimerTwo && (
      <StyledPriceDisclaimer>
        <Label intlKey="price_disclaimer_2" />
      </StyledPriceDisclaimer>
    )}
  </Wrapper>
)

Price.propTypes = {
  className: PropTypes.string,
  price: PropTypes.number,
  comparePrice: PropTypes.number,
  showPrefix: PropTypes.bool,
  showSuffix: PropTypes.bool,
  showDisclaimer: PropTypes.bool,
  showDisclaimerTwo: PropTypes.bool,
}

Price.defaultProps = {
  className: null,
  price: null,
  comparePrice: null,
  showPrefix: false,
  showSuffix: false,
  showDisclaimer: false,
  showDisclaimerTwo: false,
}

export default Price
