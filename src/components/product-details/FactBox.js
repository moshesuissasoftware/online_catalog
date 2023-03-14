import React from 'react'
import PropTypes from 'prop-types'
import styled, { withProp, theme, rem } from '@nobia/zeus-components/lib/styled'
import { transparentize } from '@nobia/zeus-components/lib/helpers/polished'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import { Paragraph, Headline } from '@nobia/zeus-components/lib/text'

const Box = styled.div`
  max-width: ${rem(300)};
  padding: ${rem(30)};
  margin-top: ${rem(10)};
  margin-bottom: ${rem(30)};
  background: ${withProp('theme.colors.grey', transparentize(0.23))};
`

const BoxTitle = withTranslation('app.product')(styled(Headline)`
  margin-top: 0;
  font-size: ${rem(15)};
  color: ${theme('colors.secondary')};
`)

const BoxText = styled(Paragraph)`
  margin-bottom: 0;
`

const FactBox = ({ children }) => (
  <Box>
    <BoxTitle intlKey="technical_details_fact">Fact</BoxTitle>
    <BoxText>{children}</BoxText>
  </Box>
)

FactBox.propTypes = {
  children: PropTypes.node,
}

FactBox.defaultProps = {
  children: null,
}

export default FactBox
