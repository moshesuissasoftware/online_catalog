import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import settings from '@nobia/zeus-components/lib/settings'
import styled, { ifProp, theme } from '@nobia/zeus-components/lib/styled'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import { Icon } from '@nobia/zeus-components/lib/icons'
import { Paragraph } from '@nobia/zeus-components/lib/text'
import { toTitleCase } from '../../utils'
import HerculesLink from '../hercules-link'

const ActiveBreadcrumb = styled.span`
  font-size: ${theme('breadcrumbs.fontSize')};
  text-transform: ${theme('breadcrumbs.textTransform')};
  color: ${theme('breadcrumbs.default.colorHover')};
`

const LinkedBreadcrumb = ActiveBreadcrumb.withComponent(HerculesLink)
const Label = withTranslation('app.nav')('span')

const MobileIcon = styled(Icon).attrs({ type: 'chevron-left' })`
  display: flex;
  text-decoration: none;
  align-items: center;
  color: ${theme('breadcrumbs.default.color')};
`

const MobileLink = styled(HerculesLink)`
  display: inline-block;
  text-decoration: none;

  &:hover,
  &:focus {
    color: inherit;
  }
`

const StyledParagraph = styled(Paragraph)`
  text-align: left;
  line-height: 2;
  margin-bottom: 0;
  color: ${ifProp(
    'hasBackground',
    theme('breadcrumbs.hasBackground.color'),
    theme('breadcrumbs.default.color')
  )};

  ${LinkedBreadcrumb} {
    color: currentColor;
    text-decoration: ${ifProp(
      'hasBackground',
      theme('breadcrumbs.hasBackground.textDecoration'),
      theme('breadcrumbs.default.textDecoration')
    )};

    &:hover {
      color: ${ifProp(
        'hasBackground',
        theme('breadcrumbs.hasBackground.colorHover'),
        theme('breadcrumbs.default.colorHover')
      )};
      text-decoration: ${ifProp(
        'hasBackground',
        theme('breadcrumbs.hasBackground.textDecorationHover'),
        theme('breadcrumbs.default.textDecorationHover')
      )};
    }
  }
`

const MobileParagraph = styled(StyledParagraph)`
  color: ${ifProp(
    'hasBackground',
    theme('breadcrumbs.hasBackground.colorMobile'),
    theme('breadcrumbs.default.colorMobile')
  )};
  ${props => props.theme.media.min.md`
    display: none;
  `};
`
const DesktopParagraph = styled(StyledParagraph)`
  ${props => props.theme.media.max.sm`
    display: none;
  `};
`

const Separator = styled(ActiveBreadcrumb)`
  margin: 0 0.25em;
`

const Breadcrumbs = ({ breadcrumbs, hasBackground }) => (
  <Fragment>
    <DesktopParagraph
      size="small"
      data-cy="Breadcrumbs"
      hasBackground={hasBackground}
    >
      <LinkedBreadcrumb to="/">
        <Label intlKey="start">Start</Label>
      </LinkedBreadcrumb>
      <Separator>
        <Icon
          type="chevron-right"
          width="7px"
          color={theme('breadcrumbs.default.color')}
          fill={theme('breadcrumbs.default.color')}
        />
      </Separator>
      {breadcrumbs.map((breadcrumb, i) => (
        <Fragment key={breadcrumb.name}>
          {breadcrumb.href ? (
            <LinkedBreadcrumb to={breadcrumb.href}>
              {toTitleCase(breadcrumb.name, settings.lang)}
            </LinkedBreadcrumb>
          ) : (
            <ActiveBreadcrumb>
              {toTitleCase(breadcrumb.name, settings.lang)}
            </ActiveBreadcrumb>
          )}
          {i < breadcrumbs.length - 1 && (
            <Separator>
              <Icon
                type="chevron-right"
                width="7px"
                color={theme('breadcrumbs.default.color')}
                fill={theme('breadcrumbs.default.color')}
              />
            </Separator>
          )}
        </Fragment>
      ))}
    </DesktopParagraph>
    <MobileParagraph hasBackground={hasBackground}>
      {breadcrumbs.length < 2 ? (
        <MobileLink to="/">
          <MobileIcon>
            <Label intlKey="start">Start</Label>
          </MobileIcon>
        </MobileLink>
      ) : (
        <MobileLink to={breadcrumbs[breadcrumbs.length - 2].href}>
          <MobileIcon>
            <span>
              {toTitleCase(
                breadcrumbs[breadcrumbs.length - 2].name,
                settings.lang
              )}
            </span>
          </MobileIcon>
        </MobileLink>
      )}
    </MobileParagraph>
  </Fragment>
)

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  hasBackground: PropTypes.bool,
}

Breadcrumbs.defaultProps = {
  hasBackground: false,
}

export default Breadcrumbs
