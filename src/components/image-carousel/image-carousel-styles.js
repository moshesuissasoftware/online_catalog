import { Icon } from '@nobia/zeus-components/lib/icons'
import styled, { ifProp, prop, css } from '@nobia/zeus-components/lib/styled'
import { Row, Column } from '@nobia/zeus-components/lib/grid'
import { ProductImage } from '@nobia/zeus-components/lib/image'
import Bubbles from './CarouselBubbles'

const CarouselWrapper = styled.div`
  position: relative;
  padding-bottom: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid #eceded;
  box-sizing: border-box;
  border-radius: 3px;
`

const ItemWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${(props) => props.theme.media.min.md`
    padding: ${prop('theme.grid.gutter')};
  `};
`

const StyledProductImage = styled(ProductImage)`
  cursor: pointer;
  img {
    border-radius: 3px;
    border: 1px #eceded;
    box-sizing: border-box;
  }
`
const StyledProductVideo = styled.div``
const VideoComponent = styled.video`
  width: 100%;
`
const VideoThumbnailComponent = styled.video`
  width: 115px;
  margin-top: 5px;
`

const ThumbnailRow = styled(Row)`
  margin: 0;
  flex-wrap: inherit;
  overflow: hidden;
  overflow-x: auto;
  padding-bottom: 0px;
  ${(props) => props.theme.media.max.sm`
    display: none;
    padding-bottom: 14px;
  `};
  ${(props) => props.theme.media.max.md`
    padding-bottom: 14px;
  `};
`

const Chevron = styled.button`
  position: absolute;
  ${prop('direction')} ${prop('theme.grid.gutter')};
  top: 10%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  background-color: #eceded;
  border-radius: 3px;
  padding-top: 3px;
`

const ThumbnailColumnVideo = styled(Column)`
  ${ThumbnailRow} & {
    padding-right: 0px;
    padding-left: 0px;
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    &::after {
      border-radius: 2px;
      content: '';
      display: block;
      position: absolute;
      top: 33%;
      left: 33%;
      border-style: solid;
      border-width: 13px 0 13px 23px;
      border-color: transparent transparent transparent rgba(255, 255, 255, 1);
    }
  }
`

const ThumbnailColumn = styled(Column)`
  ${ThumbnailRow} & {
    cursor: pointer;
    padding: 0.5%;
    max-width: 82px;
    margin-right: 24px;
    margin-top: 24px;
  }
  ${ifProp(
    'active',
    css`
      border: 1px solid ${prop('theme.colors.border')};
      border-radius: 3px;
    `
  )};
`

const StyledBubbles = styled(Bubbles)`
  ${(props) => props.theme.media.min.md`
    display: none;
  `};
`

const StyledIcon = styled(Icon)`
  svg {
    margin-top: 5px;
  }
`

const StyledChevron = styled(Chevron)`
  height: 38px;
  width: 48px;
  right: 24px;
  padding-top: 0;
  top: 43px;
  ${(props) => props.theme.media.max.sm`
    display: none;
  `};
`

const LeftArrow = styled(StyledChevron)`
  margin-right: 72px;
`
const RightArrow = styled(StyledChevron)``

export {
  CarouselWrapper,
  ItemWrapper,
  LeftArrow,
  RightArrow,
  StyledBubbles,
  StyledIcon,
  StyledProductImage,
  StyledProductVideo,
  ThumbnailColumn,
  ThumbnailColumnVideo,
  ThumbnailRow,
  VideoComponent,
  VideoThumbnailComponent,
}
