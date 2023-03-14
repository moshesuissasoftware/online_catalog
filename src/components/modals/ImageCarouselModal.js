import React from 'react'
import PropTypes from 'prop-types'
import Carousel, {
  modulusPositive as modP,
} from '@nobia/zeus-components/lib/carousel'
import styled, { prop, theme, rem } from '@nobia/zeus-components/lib/styled'
import { Icon } from '@nobia/zeus-components/lib/icons'
import LoadingImage from './LoadingImage'
import Modal from './Modal'
import Bubbles from '../image-carousel/CarouselBubbles'

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
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const ItemWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
`

const StyledLoadingImage = styled(LoadingImage)`
  padding-bottom: 1.5%;
  height: 100%;
  width: 100%;
`

const Chevron = styled.button`
  position: absolute;
  ${prop('direction')}: ${prop('theme.grid.gutter')};
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
`

const StyledBubbles = styled(Bubbles)`
  position: absolute;
  bottom: ${rem(5)};
  left: 50%;
  transform: translateX(-50%);
`

const ImageCarouselModal = ({ images, offset, setOffset, ...props }) => (
  <StyledModal {...props}>
    <CarouselWrapper>
      <Chevron
        direction="left"
        onClick={() => setOffset(modP(offset - 1, images.length))}
      >
        {images.length > 1 && offset !== 0 && (
          <Icon type="chevron-left" width={30} height={30} />
        )}
      </Chevron>
      <Carousel items={images} selectedIndex={offset} transition>
        {({ items, bindRef }) =>
          items.map((item, i) => (
            <ItemWrapper ref={bindRef(i)} key={item}>
              <StyledLoadingImage
                src={item}
                width={1920}
                height={1920}
                crop="fit"
              />
            </ItemWrapper>
          ))
        }
      </Carousel>
      <Chevron
        direction="right"
        onClick={() => setOffset(modP(offset + 1, images.length))}
      >
        {images.length > 1 && offset !== images.length - 1 && (
          <Icon type="chevron-right" width={30} height={30} />
        )}
      </Chevron>
    </CarouselWrapper>
    {images.length > 1 && (
      <StyledBubbles items={images} offset={offset} setOffset={setOffset} />
    )}
  </StyledModal>
)

ImageCarouselModal.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
}

export default ImageCarouselModal
