import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  lifecycle,
  withState,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'

import Carousel, {
  modulusPositive as modP,
} from '@nobia/zeus-components/lib/carousel'
import { ProductImage } from '@nobia/zeus-components/lib/image'
import { LightboxOverlay, Overlay } from '@nobia/zeus-components/lib/overlay'
import StaticImageCarouselModal from '../modals/StaticImageCarouselModal'
import {
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
} from './image-carousel-styles'

const calculateNextSelection = (previous, current, limit) => {
  const next = Math.round(current)
  if (previous === next) {
    if (current - previous > limit) {
      return previous + 1
    }
    if (current - previous < -limit) {
      return previous - 1
    }
  }
  return next
}

const ImageCarousel = ({
  images,
  videos,
  name,
  tags,
  setOffset,
  offset,
  setImage,
  handleChange,
  handleClick,
  handleKeyboardEvent,
  overlayOpen,
  transition,
  isClient,
  showImageModal,
}) => {
  const [toggleLinks, setToggleLinks] = useState(false)
  const vidRef = useRef()

  const imagesData = useMemo(
    () => images.map((image) => ({ src: image, image: true, tags })),
    [images]
  )
  const videosData = useMemo(
    () => videos.map((video) => ({ src: video.url, video: true })),
    [videos]
  )
  const data = useMemo(
    () => imagesData.concat(videosData),
    [imagesData, videosData]
  )
  const vimages = useMemo(() => images.concat(videos), [images, videos])
  const isiPad = useMemo(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    return (
      ua.indexOf('ipad') > -1 ||
      (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
    )
  }, [])

  const PlayVid = useCallback(() => {
    if (vidRef.current) {
      vidRef.current.play()
    }
  }, [vidRef])

  const PauseVid = useCallback(() => {
    if (vidRef.current) {
      vidRef.current.pause()
    }
  }, [vidRef])

  const isIE = !!document.documentMode
  return (
    <Fragment>
      <CarouselWrapper>
        {vimages.length > 1 && (
          <LeftArrow
            className={isiPad ? 'icon-arrow-ipad' : ''}
            disabled={offset === 0}
            direction="right"
            onClick={() => setOffset(modP(offset - 1, vimages.length))}
          >
            {vimages.length > 1 && offset !== 0 && (
              <StyledIcon type="arrow-left-carousel" width={40} height={30} />
            )}
            {vimages.length && offset === 0 && (
              <StyledIcon type="arrow-left-disabled" width={40} height={30} />
            )}
          </LeftArrow>
        )}
        <Carousel
          items={data}
          selectedIndex={offset}
          transition={transition}
          onOffsetChange={(index) =>
            setOffset(
              modP(calculateNextSelection(offset, index, 0.2), vimages.length)
            )
          }
        >
          {({ items, bindRef }) =>
            items.map((item, i) => (
              <ItemWrapper
                ref={bindRef(i)}
                key={item.src}
                data-cy={
                  vimages[offset] === item ? 'data-CurrentSlide' : undefined
                }
                data-current={vimages[offset] === item}
              >
                {item.video && (
                  <StyledProductVideo>
                    <VideoComponent
                      ref={vidRef}
                      style={{ width: '100%' }}
                      controls
                      className="vid"
                      onClick={PlayVid}
                      src={item.src}
                    />
                  </StyledProductVideo>
                )}
                {item.image && (
                  <StyledProductImage
                    size={900}
                    src={item.src}
                    tags={item.tags}
                    alt={name}
                    title={name}
                    itemProp="image"
                    // eslint-disable-next-line
                    onClick={(handleClick, showImageModal)}
                  />
                )}
              </ItemWrapper>
            ))
          }
        </Carousel>
        {vimages.length > 1 && (
          <RightArrow
            className={isiPad ? 'icon-arrow-ipad' : ''}
            disabled={offset === vimages.length - 1}
            style={{ right: '24px' }}
            direction="right"
            onClick={() => setOffset(modP(offset + 1, vimages.length))}
          >
            {vimages.length > 1 && offset !== vimages.length - 1 && (
              <StyledIcon type="arrow-right-carousel" width={40} height={30} />
            )}
            {vimages.length && offset === vimages.length - 1 && (
              <StyledIcon type="arrow-right-disabled" width={40} height={30} />
            )}
          </RightArrow>
        )}
      </CarouselWrapper>

      {!toggleLinks && isClient && imagesData.length > 0 && <></>}
      <Overlay
        open={overlayOpen}
        handleChange={handleChange}
        handleKeyboardEvent={handleKeyboardEvent}
        render={(props) => (
          <LightboxOverlay {...props}>
            <StaticImageCarouselModal
              images={images}
              videos={videos}
              offset={offset}
              setOffset={setOffset}
              {...props}
            />
          </LightboxOverlay>
        )}
      />
      {data.length > 1 && (
        <Fragment>
          <StyledBubbles items={data} offset={offset} setOffset={setOffset} />
          <ThumbnailRow>
            {data.map((item, i) => (
              <ThumbnailColumn key={item.src} size={2} active={i === offset}>
                {item.image && (
                  <ProductImage
                    style={{
                      height: '100%',
                    }}
                    size={82}
                    src={item.src}
                    alt={name}
                    title={name}
                    onClick={() => {
                      setImage(i)
                      setToggleLinks(false)
                      PauseVid()
                    }}
                  />
                )}
                {!isIE && item.video && (
                  <ThumbnailColumnVideo
                    onClick={() => {
                      if (!toggleLinks) {
                        setToggleLinks(!toggleLinks)
                      }
                      PauseVid()
                      setImage(i)
                    }}
                  >
                    <VideoThumbnailComponent>
                      <source src={`${item.src}#t=3`} />
                    </VideoThumbnailComponent>
                  </ThumbnailColumnVideo>
                )}
              </ThumbnailColumn>
            ))}
          </ThumbnailRow>
        </Fragment>
      )}
    </Fragment>
  )
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  setOffset: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  setImage: PropTypes.func.isRequired,
  transition: PropTypes.bool.isRequired,
  isClient: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleKeyboardEvent: PropTypes.func.isRequired,
  overlayOpen: PropTypes.bool.isRequired,
  showImageModal: PropTypes.func.isRequired,
}

ImageCarousel.defaultProps = {
  tags: [],
}

export default compose(
  withState('offset', 'setOffset', 0),
  withState('transition', 'setTransition', false),
  withState('overlayOpen', 'setOverlayOpen', false),
  withState('isClient', 'setIsClient', false),
  lifecycle({
    componentDidMount() {
      this.props.setIsClient(true)
    },
  }),
  withHandlers({
    setImage:
      ({ setOffset, setTransition }) =>
      (index) => {
        setTransition(false, () => {
          setOffset(index, () => {
            setTransition(true)
          })
        })
      },
    showImageModal:
      ({ setOverlayOpen }) =>
      () => {
        document.querySelector('body').classList.add('gallery-modal--open')
        setOverlayOpen(true)
      },
    handleClick:
      ({ setOverlayOpen }) =>
      () => {
        setOverlayOpen(true)
      },
    handleKeyboardEvent:
      ({ setOffset, offset, images }) =>
      (event) => {
        if (event.key === 'ArrowLeft') {
          setOffset(modP(offset - 1, images.length))
        }
        if (event.key === 'ArrowRight') {
          setOffset(modP(offset + 1, images.length))
        }
      },
    handleChange:
      ({ overlayOpen, setOverlayOpen }) =>
      () => {
        setOverlayOpen(!overlayOpen)
        if (overlayOpen) {
          document.querySelector('body').classList.remove('gallery-modal--open')
        }
      },
  })
)(ImageCarousel)
