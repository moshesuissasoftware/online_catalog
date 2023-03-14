import React from 'react'
import PropTypes from 'prop-types'

import styled, { prop, theme, rem } from '@nobia/zeus-components/lib/styled'
import settings from '@nobia/zeus-components/lib/settings'
import { Paragraph } from '@nobia/zeus-components/lib/text'

const ballHeight = 20
const Ball = styled.img.attrs(({ attribute, value }) => ({
  src: prop([attribute, value].join('.'))(settings.variantImages),
}))`
  width: ${rem(ballHeight)};
  height: ${rem(ballHeight)};
  display: block;
  margin: 0 ${rem(1)};
  border: 2px solid ${prop('theme.colors.backgroundSecondary')};
  background: ${prop('theme.colors.backgroundSecondary')};
  border-radius: 50%;
`
const EmptyBall = styled(Paragraph)`
  height: ${rem(ballHeight)};
  line-height: ${rem(ballHeight)};
  background: ${prop('theme.colors.backgroundSecondary')};
  margin: 0 ${rem(1)};
  padding: 0 ${rem(ballHeight / 2)};
  border-radius: ${rem(ballHeight / 2)};
`

const FlexList = styled.ul`
  position: absolute;
  right: ${theme('grid.gutter')};
  bottom: ${theme('grid.gutter')};
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`

const VariantList = ({ variants, attribute, className }) => (
  <FlexList className={className}>
    {variants.slice(0, 3).map(variant => (
      <li key={variant.id}>
        <Ball attribute={attribute} value={prop(attribute)(variant)} />
      </li>
    ))}
    {variants.length > 3 && (
      <li>
        <EmptyBall size="small">+{variants.length - 3}</EmptyBall>
      </li>
    )}
  </FlexList>
)
VariantList.propTypes = {
  variants: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  attribute: PropTypes.string.isRequired,
  className: PropTypes.string,
}

VariantList.defaultProps = {
  className: null,
}

export default VariantList
