import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { Container, Column } from '@nobia/zeus-components/lib/grid'

const BannerWrapper = styled(Container)`
  padding: 0 ${rem(14)};
  flex-direction: row;
  grid-column: span 3;
  width: 100%;
  ${props => props.theme.media.max.sm`
        padding: 0 16px;
        grid-column: span 2;
    `};
  @media (max-width: 720px) {
    grid-column: span 1;
  }
`

const BannerContainer = styled(Container)`
  padding: ${rem(32)} ${rem(16)};
  display: flex;
  flex-direction: row;
  flex: 0 0 75%;
  background-image: url(${props => props.img});
  background-size: cover;
  border-radius: 3px;
  margin-bottom: ${rem(32)};
  ${props => props.theme.media.max.sm`
        padding: ${rem(16)};
        flex-wrap: wrap;
        flex: 0 0 100%;
    `};
`
const BannerTitle = styled.h4`
  margin: 0 0 ${rem(8)};
  font-family: ${theme('categoryCard.fontFamily')};
  line-height: ${rem(26)};
  font-size: ${rem(20)};
  font-weight: 500;
  color: white;
  ${props => props.theme.media.max.sm`
        font-size: ${rem(17.5)};
        line-height: ${rem(22)};
    `};
`

const LeftColumn = styled(Column)`
  flex: 0 0 75%;
  padding: 0;
  ${props => props.theme.media.max.sm`
        flex: 0 0 100%;
    `};

  @media (max-width: 1360px) {
    flex: 0 0 70%;
  }
  @media (max-width: 1170px) {
    flex: 0 0 65%;
  }
  @media (max-width: 1040px) {
    flex: 0 0 60%;
  }
  @media (max-width: 720px) {
    flex: 0 0 100%;
  }
`
const RightColumn = styled(Column)`
  flex: 0 0 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${rem(24)};
  ${props => props.theme.media.max.sm`
        flex: 0 0 100%;
        padding: 0;
    `};

  @media (max-width: 1360px) {
    flex: 0 0 30%;
  }
  @media (max-width: 1170px) {
    flex: 0 0 35%;
  }
  @media (max-width: 1040px) {
    flex: 0 0 40%;
  }
  @media (max-width: 720px) {
    flex: 0 0 100%;
  }
`

const BannerPreamble = styled.p`
  margin: 0;
  line-height: ${rem(14)};
  font-size: ${rem(16)};
  font-weight: 400;
  color: white;
  font-family: Campton;
  ${props => props.theme.media.max.sm`
        font-size: ${rem(14)};
        line-height: ${rem(17)};
    `};
`

const BannerLink = styled.a`
  background-color: white;
  border-radius: 3px;
  padding: ${rem(16)} ${rem(32)};
  font-size: 16px;
  font-weight: 500;
  max-height: ${rem(50)};
  line-height: ${rem(16)};
  text-decoration: none;
  color: ${theme('typography.link.color')};
  :visited {
    color: ${theme('typography.link.color')};
  }
  ${props => props.theme.media.max.sm`
        margin-top: ${rem(16)};
        width: 100%;
        padding: ${rem(16)};
        line-height: ${rem(16)};
        text-align: center;
    `};

  @media (max-width: 960px) {
    font-size: 14px;
  }
`
export {
  BannerWrapper,
  BannerContainer,
  BannerTitle,
  LeftColumn,
  RightColumn,
  BannerPreamble,
  BannerLink,
}
