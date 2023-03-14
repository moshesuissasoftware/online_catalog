import React, { useEffect, useState } from 'react'
import styled, { prop } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import { Icon } from '@nobia/zeus-components/lib/icons'

const StyledIcon = styled(Icon)`
  svg {
    margin-top: 5px;
  }
`
const ContentCarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`
const SingelContentCarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  width: 281px;
  margin-left: 0;
  margin-right: auto;
`
const Chevron = styled.button`
  position: absolute;
  ${prop('direction')}: ${prop('theme.grid.gutter')};
  top: 10%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  background-color: #eceded;
  border-radius: 3px;
  padding-top: 3px;
`

const StyledChevron = styled(Chevron)`
  height: 38px;
  width: 48px;
  right: 24px;
  padding-top: 0;
  top: 50%;
`
const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`
const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const LeftArrow = styled(StyledChevron)`
  margin-right: 72px;
  left: -70px;
  ${props => props.theme.media.max.md`
  left: 0px;
  `};
  ${props => props.theme.media.max.sm`
    display: none;
  `};
`
const RightArrow = styled(StyledChevron)`
  right: -64px;
  ${props => props.theme.media.max.md`
    right: 0px;
  `};
  ${props => props.theme.media.max.sm`
    display: none;
  `};
`
const Content = styled.div``

const GridCarousel = props => {
  const { children, show } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children ? children.length : 0)

  const [touchPosition, setTouchPosition] = useState(null)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children ? children.length : 0)
  }, [children])

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  const handleTouchStart = e => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = e => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }
  const ua = window.navigator.userAgent.toLowerCase()
  const isiPad =
    ua.indexOf('ipad') > -1 ||
    (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
  return (
    <>
      {children && children.length > 1 ? (
        <CarouselContainer>
          <CarouselWrapper>
            {/* You can alwas change the content of the button to other things */}
            {currentIndex > 0 ? (
              <LeftArrow
                className={isiPad ? 'icon-arrow-ipad' : ''}
                onClick={prev}
              >
                <StyledIcon type="arrow-left-carousel" width={40} height={30} />
              </LeftArrow>
            ) : (
              <LeftArrow
                className={isiPad ? 'icon-arrow-ipad' : ''}
                onClick={prev}
              >
                <StyledIcon type="arrow-left-disabled" width={40} height={30} />
              </LeftArrow>
            )}
            <ContentCarouselWrapper
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <Content
                className={`carousel-content show-${show}`}
                style={{
                  transform: `translateX(-${currentIndex * (77 / show)}%)`,
                }}
              >
                {children}
              </Content>
            </ContentCarouselWrapper>
            {currentIndex < length - show ? (
              <RightArrow
                className={isiPad ? 'icon-arrow-ipad' : ''}
                onClick={next}
              >
                <StyledIcon
                  type="arrow-right-carousel"
                  width={40}
                  height={30}
                />
              </RightArrow>
            ) : (
              <RightArrow
                className={isiPad ? 'icon-arrow-ipad' : ''}
                onClick={next}
              >
                <StyledIcon
                  type="arrow-right-disabled"
                  width={40}
                  height={30}
                />
              </RightArrow>
            )}
          </CarouselWrapper>
          <div className="carousel-content" />
        </CarouselContainer>
      ) : (
        <SingelContentCarouselWrapper
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <Content
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (61.8 / show)}%)`,
            }}
          >
            {children}
          </Content>
        </SingelContentCarouselWrapper>
      )}
    </>
  )
}
GridCarousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  show: PropTypes.number.isRequired,
}
export default GridCarousel
