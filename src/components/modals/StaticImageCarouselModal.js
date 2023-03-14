import React from 'react'
import PropTypes from 'prop-types'
import Carousel from '@nobia/zeus-components/lib/carousel'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import LoadingImage from './LoadingImage'
import Modal from './Modal'

const StyledModal = styled(Modal)`
  padding: 0;
  width: 100%;
  height: 100%;
  max-height: unset;
  max-width: unset;
  > div {
    padding: ${rem(15)} ${theme('grid.gutter')} ${theme('grid.gutter')};
    ${props => props.theme.media.min.md`
      height: 100%;
      max-height: 100vh;
    `};
  }
`
const CarouselWrapper = styled.div`
  position: relative;
`

const StyledLoadingImage = styled(LoadingImage)`
  padding-bottom: 48px;
  min-height: 500px;
  margin-top: 61px;
  & > img {
    width: 824px;
  }
  @media (max-width: 800px) {
    & > img {
      width: 100%;
      height: 100%;
    }
  }
`
const StyledVideo = styled.video`
  padding-bottom: 48px;
  min-height: 500px;
  margin-top: 61px;
  width: 824px;
  @media (max-width: 800px) {
    width: 100% !important;
  }
`
const StaticImageCarouselModal = ({
  videos,
  images,
  offset,
  setOffset,
  ...props
}) => (
  <StyledModal {...props}>
    <CarouselWrapper>
      <Carousel items={images} selectedIndex={offset} transition>
        {({ items }) =>
          items.map(item => (
            <StyledLoadingImage key={item} src={item} crop="fit" />
          ))
        }
      </Carousel>
    </CarouselWrapper>
    {videos && videos.map(vid => <StyledVideo controls src={vid} />)}
  </StyledModal>
)

StaticImageCarouselModal.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
}

export default StaticImageCarouselModal
