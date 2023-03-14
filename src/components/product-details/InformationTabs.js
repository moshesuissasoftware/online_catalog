import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import styled, { rem, theme } from '@nobia/zeus-components/lib/styled'
import { Paragraph, Headline } from '@nobia/zeus-components/lib/text'
import { Row, Column } from '@nobia/zeus-components/lib/grid'
import {
  TabArea,
  TabItem,
  TabButton,
  TabPanel,
} from '@nobia/zeus-components/lib/tabs'

import FeatureList from './FeatureList'
import FactBox from './FactBox'
import FileList from './FileList'
import withDisplay from './withDisplay'

const ColumnSection = styled(Paragraph.withComponent('section'))`
  white-space: pre-line;
  width: 100%;
  max-width: ${rem(750)};
  font-size: ${rem(16)};
`

const SectionHeadline = withTranslation('app.product')(styled(Headline)`
  font-size: ${rem(15)};
  color: ${theme('colors.secondary')};
`)

const IntlTabButton = withTranslation('app.product')(TabButton)

const PaddedRow = styled(Row)`
  margin-top: ${rem(20)};
`

const InformationTabs = ({ product, display }) => (
  <TabArea>
    {display('tabs.description') && (
      <TabItem id="description">
        <IntlTabButton intlKey="description">Description</IntlTabButton>
        <TabPanel>
          <PaddedRow>
            <Column>
              <ColumnSection>{product.description}</ColumnSection>
            </Column>
          </PaddedRow>
        </TabPanel>
      </TabItem>
    )}
    {display('tabs.technical_details') && (
      <TabItem id="technical_details">
        <IntlTabButton intlKey="technical_details">
          Technical details
        </IntlTabButton>
        <TabPanel>
          <PaddedRow>
            <Column sm={6}>
              <SectionHeadline intlKey="technical_details_general">
                General
              </SectionHeadline>
              <FeatureList
                features={product.features}
                filterPageId={product.filterPage.id}
              />
            </Column>
            <Column sm={4} smOffset={1}>
              {/*
              <SectionHeadline intlKey="technical_details_bullets">
                Good to know
              </SectionHeadline>
              */}
              <FactBox>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel neque tincidunt, porta dui id, eleifend nisl.
              </FactBox>
            </Column>
          </PaddedRow>
        </TabPanel>
      </TabItem>
    )}
    {display('tabs.instructions') && (
      <TabItem id="instructions">
        <IntlTabButton intlKey="instructions">
          Mounting & Instructions
        </IntlTabButton>
        <TabPanel>
          <PaddedRow>
            <Column sm={6}>
              <FileList
                title="Produktblad"
                files={[
                  {
                    // TODO: Get from API
                    title: 'Produktblad',
                    url: product.pdfLink,
                  },
                  {
                    title: 'Lorem ipsum',
                    url: 'https://google.com',
                  },
                ]}
              />
            </Column>
          </PaddedRow>
        </TabPanel>
      </TabItem>
    )}
  </TabArea>
)

InformationTabs.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    features: PropTypes.shape({}).isRequired,
    filterPage: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    pdfLink: PropTypes.string,
  }).isRequired,
  display: PropTypes.func.isRequired,
}

export default withDisplay(props => props.product.filterPage.id)(
  InformationTabs
)
