import React from 'react'
import PropTypes from 'prop-types'
import styled, { theme } from '@nobia/zeus-components/lib/styled'
import { Column } from '@nobia/zeus-components/lib/grid'

const Container = styled.div`
  grid-column: span 2;
  grid-row: span 1;
  padding: ${p => (p.isFilterPage ? '10px 16px' : '0 0 32px')};
  margin: ${p => (p.isFilterPage ? '0' : '0 19px')};

  ${props => props.theme.media.max.sm`
      max-width: 100%;
      grid-column: span 1;
      padding-bottom: ${p => (p.isFilterPage ? '10px' : '32px')};
      padding-top: ${p => (p.isFilterPage ? '10px' : '0')};
  `};
`

const Content = styled.div`
  background-color: #${p => p.bgColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

const Image = styled.img`
  max-width: 193px;
  max-height: 193px;
  @media (min-width: 1100px) {
    float: right;
    width: 40%;
  }
`

const Header = styled.h2`
  font-size: ${theme('promotions.title.fontSize')};
  line-height: ${theme('promotions.title.lineHeight')};
  font-weight: 700;
  margin: 22px 0 10px 0;
  color: ${theme('promotions.title.color')};
  text-align: center;
  font-family: ${theme('categoryCard.fontFamily')};
  ${props => props.theme.media.max.sm`
      font-size: ${theme('promotions.title.mobile.fontSize')};
      line-height: ${theme('promotions.title.mobile.lineHeight')};
  `};
  ${props => props.theme.media.min.md`
      font-size: ${theme('promotions.title.mobile.fontSize')};
      line-height: ${theme('promotions.title.mobile.lineHeight')};
  `};
`

const Preamble = styled.p`
  margin-top: 0;
  font-size: ${theme('promotions.preamble.fontSize')};
  line-height: ${theme('promotions.preamble.lineHeight')};
  font-weight: 300;
  max-width: 650px;
  text-align: center;
  font-family: ${theme('promotions.preamble.fontFamily')};
`

const Cta = styled.a`
  border-radius: 3px;
  max-width: 210px;
  text-align: center;
  color: ${theme('promotions.cta.color')};
  background-color: ${theme('promotions.cta.backgroundColor')};
  border: 1px solid ${theme('promotions.cta.color')};
  padding: 16px 24px;
  text-decoration: none;
  font-size: ${theme('promotions.cta.fontSize')};
  line-height: ${theme('promotions.cta.lineHeight')};
  font-weight: ${theme('promotions.cta.fontWeight')};
  font-family: ${theme('promotions.cta.fontFamily')};
  :hover {
    opacity: 0.85;
  }
`
const StyledColumn = styled(Column)`
  @media (min-width: 1100px) {
    margin-top: -200px;
    width: 60%;
    align-self: flex-start;
    text-align: center;
  }
`
const CtaContainer = styled.div`
  margin: ${theme('promotions.cta.content.margin')};
  text-align: center;
  @media (min-width: 700px) {
    margin-bottom: 20px;
  }
`
const StyledColumnImage = styled(Column)`
  @media (max-width: 1100px) {
    text-align: center;
  }
`
const Promotion = ({ promotion, isFilterPage }) => (
  <Container isFilterPage={isFilterPage}>
    <Content bgColor={promotion.backgroundColor}>
      <StyledColumnImage>
        <Image src={promotion.image} />
      </StyledColumnImage>
      <StyledColumn>
        <Header>{promotion.title}</Header>
        <Preamble>{promotion.preamble}</Preamble>
        {promotion.buttonLink && promotion.buttonText && (
          <CtaContainer>
            <Cta href={promotion.buttonLink}>{promotion.buttonText}</Cta>
          </CtaContainer>
        )}
      </StyledColumn>
    </Content>
  </Container>
)

Promotion.propTypes = {
  promotion: PropTypes.shape({
    backgroundColor: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    preamble: PropTypes.string,
    buttonLink: PropTypes.string,
    buttonText: PropTypes.string,
  }).isRequired,
  isFilterPage: PropTypes.bool,
}

Promotion.defaultProps = {
  isFilterPage: false,
}
export default Promotion
