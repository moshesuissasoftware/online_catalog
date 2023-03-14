import React from 'react'
import PropTypes from 'prop-types'

import features, { featureIf } from '@nobia/zeus-components/lib/features'
import settings from '@nobia/zeus-components/lib/settings'
import styled, {
  ifProp,
  withProp,
  prop,
  css,
  theme,
  rem,
} from '@nobia/zeus-components/lib/styled'
import { Container, Row, Column } from '@nobia/zeus-components/lib/grid'
import Markdown from '@nobia/zeus-components/lib/markdown'
import { PageTitle } from '@nobia/zeus-components/lib/text'
import Image from '@nobia/zeus-components/lib/image'
import getImage from '@nobia/zeus-components/lib/image/getCloudinaryImage'

import { FEATURE_MY_ACCOUNT } from '../../constants'
import { toTitleCase } from '../../utils'
import { WishlistSummary } from '../wishlist'
import Breadcrumbs from './Breadcrumbs'
import ReadMore from '../readmore'

const FlexColumn = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledContainer = styled(Container)`
  @media (min-width: 1044px) {
    width: ${theme('container.medium.width')};
  }
`
const StyledImage = styled(Image).attrs({
  width: 300,
})``

const StyledRow = styled(Row)`
  padding-top: ${prop('theme.grid.gutter')};
  padding-bottom: ${prop('theme.grid.gutter')};
  @media (max-width: 450px) {
    padding-bottom: 0;
  }
`

const StyledColumn = styled(Column)`
  display: flex;
  justify-content: flex-end;
`

const StyledTitle = styled(PageTitle)`
  font-family: ${prop('theme.pageTitle.fontFamily')};
  margin-top: 0.5em;
  text-transform: ${prop('theme.header.title.textTransform')}
  letter-spacing: ${prop('theme.header.title.letterSpacing')};
  text-align: ${prop('theme.preamble.textAlign')};
  font-size: ${prop('theme.pageTitle.fontSize')};
  margin-bottom: ${prop('theme.header.title.marginBottom')};
  @media (max-width: 450px) {
    font-size: ${prop('theme.pageTitleMobile.fontSize')}!important;
    line-height: ${prop('theme.pageTitleMobile.lineHeight')}!important;
    margin-top: 20px;
  }
`

const StyledPreamble = styled(Markdown)`
  max-width: ${theme('header.maxWidth')};
  & > p {
    padding-right: ${prop('theme.preamble.paddingRight')};
    text-align: ${prop('theme.preamble.textAlign')};
    font-family: ${prop('theme.preamble.fontFamily')};
    font-size: ${prop('theme.preamble.fontSize')};
    font-weight: ${prop('theme.preamble.fontWeight')};
    line-height: 1.5;
    margin-bottom: 0;
    margin-top: 0;
    color: ${prop('theme.preamble.color')};
    @media only screen and (max-width: 767px) {
      padding-right: ${rem(0)};
      max-width: ${theme('header.mobile.maxWidth')};
    }
    @media only screen and (max-width: 450px) {
      font-size: ${theme('preamble.fontSizeMobil')};
      line-height: ${theme('preamble.lineHeightMobil')};
    }
  }
  & p > em {
    font-style: italic;
  }
`

const getDesktopImage = getImage({ width: 1920, height: 600 })
const getMobileImage = getImage({ width: 600, height: 1000 })

const HeaderWrapper = styled.div`
  width: 100%;

  ${props => props.theme.media.max.sm`
    margin-bottom: 0;
  `}
  ${ifProp(
    'backgroundImage',
    css`
      background-image: url(${withProp('backgroundImage', getMobileImage)});
      ${props => props.theme.media.min.sm`
        background-image: url(${withProp('backgroundImage', getDesktopImage)});
      `} background-size: cover;
      background-position: center;
      ${StyledTitle}, ${StyledPreamble} > p {
        color: ${theme('colors.backgroundPrimary')};
      }
    `
  )};
`
const Header = ({
  breadcrumbs,
  backgroundImage,
  headerImage,
  layout,
  title,
  preamble,
  className,
}) => (
  <HeaderWrapper
    className={className}
    backgroundImage={backgroundImage}
    layout={layout}
  >
    <StyledContainer>
      <StyledRow data-cy="Header">
        {featureIf(
          FEATURE_MY_ACCOUNT,
          <>
            {features.breadcrumbs && (
              <Column>
                <Breadcrumbs
                  breadcrumbs={breadcrumbs}
                  hasBackground={!!backgroundImage}
                />
              </Column>
            )}
          </>,
          <>
            <Column size={9}>
              {features.breadcrumbs && (
                <Breadcrumbs
                  breadcrumbs={breadcrumbs}
                  hasBackground={!!backgroundImage}
                />
              )}
            </Column>
            <StyledColumn size={3}>
              <WishlistSummary hasBackground={!!backgroundImage} />
            </StyledColumn>
          </>
        )}
      </StyledRow>
      <Row>
        <Column sm={layout === 'left-image' ? 9 : 12}>
          <StyledTitle>{toTitleCase(title, settings.lang)}</StyledTitle>
          {preamble && (
            <ReadMore>
              {preamble && <StyledPreamble>{preamble}</StyledPreamble>}
            </ReadMore>
          )}
        </Column>
        {layout === 'left-image' && (
          <FlexColumn sm={3}>
            <StyledImage src={headerImage} />
          </FlexColumn>
        )}
      </Row>
    </StyledContainer>
  </HeaderWrapper>
)

Header.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  backgroundImage: PropTypes.string,
  headerImage: PropTypes.string,
  layout: PropTypes.string,
  title: PropTypes.string.isRequired,
  preamble: PropTypes.string,
  className: PropTypes.string,
}

Header.defaultProps = {
  preamble: undefined,
  layout: 'centered',
  backgroundImage: undefined,
  headerImage: undefined,
  className: undefined,
}

export default Header
