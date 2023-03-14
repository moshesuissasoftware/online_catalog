import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import { compose, withProps } from '@nobia/zeus-components/lib/recompose'
import settings from '@nobia/zeus-components/lib/settings'
import styled, { rem, theme } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import React from 'react'

import { getCategoryFeature } from '../../utils'

const Features = styled.dl`
  margin-bottom: ${rem(30)};
`

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${theme('feature.paddingTop')} 0;
   {
    /*border-bottom: 1px solid ${theme('colors.border')};*/
  }
  font-size: ${rem(12)};
  padding: 10px;
  &:nth-child(odd) {
    background-color: ${theme('background.backgroundColor')};
  }
  ${(props) => props.theme.media.max.sm`
    font-size: 14px;`}
`

const NoFeature = withTranslation('app.product')('span')

const FeatureTitle = withTranslation('app.product')(styled.dt`
  flex: 1 0 auto;
  text-transform: ${theme('featureList.title.textTransform')};
  letter-spacing: ${theme('featureList.title.letterSpacing')};
  font-weight: ${theme('featureList.title.fontWeight')};
  ${(props) => props.theme.media.min.sm`
    font-size: ${theme('featureList.title.fontSize')};
  `}
`)

const FeatureData = styled.dd`
  flex: 0 1 auto;
  margin: 0;
  text-transform: ${theme('featureList.data.textTransform')};
  letter-spacing: ${theme('featureList.data.letterSpacing')};
  font-weight: ${theme('featureList.data.fontWeight')};
  text-align: left;
  ${(props) => props.theme.media.min.sm`
    font-size: ${theme('featureList.data.fontSize')};
  `}
  white-space: pre-wrap;
  overflow: hidden;
`

const FormatValue = (value) => {
  if (!value) return null

  const val = value.trim()

  // Handle dates
  const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  if (val.match(datePattern)) {
    const dateValue = Date.parse(val)
    if (!isNaN(dateValue)) {
      return new Date(dateValue).toISOString().substr(0, 10)
    }
  }

  // Handle booleans
  const FeatureTranslation = withTranslation('app.product.features')('span')
  if (val === 'true') {
    return <FeatureTranslation intlKey="true" />
  }
  if (val === 'false') {
    return <FeatureTranslation intlKey="false" />
  }

  return value.trim()
}

const FeatureList = ({ features, className }) => (
  <Features className={className}>
    {features.map(({ key, value }) => (
      <Feature key={key}>
        {settings.storm ? (
          <FeatureTitle>{key}</FeatureTitle>
        ) : (
          <FeatureTitle intlKey={`features.${[key]}`} />
        )}
        <FeatureData>
          {value &&
            value
              .split('\n')
              .map((item) => (
                <div key={item}>
                  {FormatValue(item) || <NoFeature intlKey="feature_na" />}
                </div>
              ))}
        </FeatureData>
      </Feature>
    ))}
  </Features>
)

FeatureList.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
}

FeatureList.defaultProps = {
  className: undefined,
}

const excludeFeatures = [
  'PDF_LINK',
  'PDF_LINK_1',
  'PDF_LINK_2',
  'PDF_LINK_3',
  'PDF_LINK_4',
  'PDF_LINK_5',
  'ITEMNUMBER',
  'HIGHLIGHT-1',
  'HIGHLIGHT-2',
  'HIGHLIGHT-3',
  'HIGHLIGHT-4',
  'HIGHLIGHT-5',
  'HIGHLIGHT-6',
  'BULLET_1',
  'BULLET_2',
  'BULLET_3',
  'BULLET_4',
  'BULLET_5',
  'BULLET_6',
  'BULLET_7',
  'BULLET_8',
  'BULLET_9',
  'BULLET_10',
]

export default compose(
  withProps(({ filterPageId, features, showBlanks }) => {
    const prefix = !settings.storm ? 'features' : ''
    const visibleFeatures =
      getCategoryFeature(filterPageId)(prefix) || Object.keys(features)
    return {
      features: visibleFeatures
        .map((key) => ({ key, value: features[key] }))
        .filter(
          (feature) =>
            (showBlanks || feature.value != null) &&
            !excludeFeatures.includes(feature.key.toUpperCase())
        ),
    }
  })
)(FeatureList)
