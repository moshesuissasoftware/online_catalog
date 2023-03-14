import React from 'react'
import { Column, Row } from '@nobia/zeus-components/lib/grid'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { SubHeadline } from '@nobia/zeus-components/lib/text'
import PropTypes from 'prop-types'
import Collapse from '../collapse/index'
import FeatureList from './FeatureList'
import FileList from './FileList'
import withDisplay from './withDisplay'

const SectionHeadline = withTranslation('app.product.features')(styled(
  SubHeadline
)`
  text-transform: capitalize;
  font-size: ${theme('subHeadline.fontSize')};
  line-height: ${theme('subHeadline.lineHeight')};
  ${(props) => props.theme.media.max.sm`
    font-size: ${theme('subHeadline.mobile.fontSize')};
    line-height: ${theme('subHeadline.mobile.lineHeight')};
  `}
`)
const ProductDescription = styled.div`
  line-height: 1.5;
  font-size: 16px;
  padding: 0 0 16px 0;
`
const PaddedRow = styled(Row)`
  margin-top: ${rem(24)};
  ${(props) => props.theme.media.max.sm`
    margin-top: 0;
  `}
`

const StyledColumn = styled(Column)`
  padding-bottom: 8px;
  ${(props) => props.theme.media.max.sm`
  padding-top: 8px;
  `}
`

const PdfLinkTitle = withTranslation('app.product')('span')
const ProductInformation = withTranslation('app.product')('span')

const InformationView = ({ product, display }) => (
  <PaddedRow>
    <StyledColumn>
      {product.description && (
        <div className={'info-product'}>
          <Collapse title={<ProductInformation intlKey="productoverview" />}>
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </Collapse>
        </div>
      )}

      {display('features') && (
        <div className={'info-product'}>
          <Collapse title={<ProductInformation intlKey="productinfo" />}>
            <FeatureList
              features={product.features}
              filterPageId={product.filterPage.id}
            />
          </Collapse>
        </div>
      )}
      {(product.pdfLink ||
        product.pdfLink1 ||
        product.pdfLink2 ||
        product.pdfLink3 ||
        product.pdfLink4 ||
        product.pdfLink5) && (
        <>
          <SectionHeadline>
            <PdfLinkTitle intlKey="pdf_title" />
          </SectionHeadline>
          <FileList
            files={[
              {
                title: (
                  <PdfLinkTitle intlKey="pdf_link">Product Sheet</PdfLinkTitle>
                ),
                url: product.pdfLink,
              },
              {
                title: (
                  <PdfLinkTitle intlKey="pdf_link_1">
                    Product Sheet
                  </PdfLinkTitle>
                ),
                url: product.pdfLink1,
              },
              {
                title: (
                  <PdfLinkTitle intlKey="pdf_link_2">
                    Product Sheet
                  </PdfLinkTitle>
                ),
                url: product.pdfLink2,
              },
              {
                title: (
                  <PdfLinkTitle intlKey="pdf_link_3">
                    Product Sheet
                  </PdfLinkTitle>
                ),
                url: product.pdfLink3,
              },
              {
                title: (
                  <PdfLinkTitle intlKey="pdf_link_4">
                    Product Sheet
                  </PdfLinkTitle>
                ),
                url: product.pdfLink4,
              },
              {
                title: (
                  <PdfLinkTitle intlKey="pdf_link_5">
                    Product Sheet
                  </PdfLinkTitle>
                ),
                url: product.pdfLink5,
              },
            ]}
          />
        </>
      )}
    </StyledColumn>
  </PaddedRow>
)

InformationView.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    size: PropTypes.string,
    features: PropTypes.objectOf(PropTypes.string).isRequired,
    filterPage: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    pdfLink: PropTypes.string,
    pdfLink1: PropTypes.string,
    pdfLink2: PropTypes.string,
    pdfLink3: PropTypes.string,
    pdfLink4: PropTypes.string,
    pdfLink5: PropTypes.string,
  }).isRequired,
  display: PropTypes.func.isRequired,
}

export default withDisplay((props) => props.product.filterPage.id)(
  InformationView
)
