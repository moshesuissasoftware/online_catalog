import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { compose, pure } from '@nobia/zeus-components/lib/recompose'
import settings from '@nobia/zeus-components/lib/settings'
import { Title } from '@nobia/zeus-components/lib/text'
import { Link } from '@nobia/zeus-components/lib/router'
import styled, {
  rem,
  ifProp,
  prop,
  css,
} from '@nobia/zeus-components/lib/styled'

import { withTranslation } from '@nobia/zeus-components/lib/i18n'

const VariantList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0 -${rem(10)};
`

const VariantListItem = styled.li`
  margin: ${ifProp('selected', css`calc(${rem(5)} - 1px)`, rem(5))};

  border-width: 1px;
  border-color: ${prop('theme.colors.link')};
  border-style: ${ifProp('selected', 'solid', 'none')};
  border-radius: 50%;
  display: block;
`

const Thumbnail = styled.img`
  width: ${rem(50)};
  height: ${rem(50)};
  min-width: ${rem(50)};
  min-height: ${rem(50)};
  max-width: ${rem(50)};
  max-height: ${rem(50)};
  margin: ${rem(5)};
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  display: block;
`

const Header = withTranslation('app.product')(styled(Title)`
  margin: 0;
`)

const VariantPicker = ({ variants, currentId, attribute }) => (
  <Fragment>
    <Header intlKey={attribute} />
    <VariantList>
      {variants.map(variant => {
        const value = prop(attribute)(variant)
        const variantImages = prop(attribute)(settings.variantImages)
        const thumbnail = prop(value)(variantImages)

        return (
          <VariantListItem key={variant.id} selected={variant.id === currentId}>
            <Link to={`../${variant.slug}/`}>
              <Thumbnail alt={value} src={thumbnail} />
            </Link>
          </VariantListItem>
        )
      })}
    </VariantList>
  </Fragment>
)

VariantPicker.propTypes = {
  variants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  attribute: PropTypes.string.isRequired,
  currentId: PropTypes.string.isRequired,
}

const enhance = compose(pure)

export default enhance(VariantPicker)
