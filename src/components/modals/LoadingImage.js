import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, ifProp } from '@nobia/zeus-components/lib/styled'
import Image from '@nobia/zeus-components/lib/image'
import LoadingIndicator from '@nobia/zeus-components/lib/loadingIndicator'
import {
  compose,
  withHandlers,
  withState,
} from '@nobia/zeus-components/lib/recompose'

const Container = styled.div`
  position: relative;
`

const StyledLoader = styled(LoadingIndicator)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  ${ifProp(
    'loaded',
    css`
      opacity: 0;
    `
  )};
`

const StyledImage = styled(Image)`
  opacity: 0;
  transition: opacity 500ms;
  ${ifProp(
    'loaded',
    css`
      opacity: 1;
    `
  )};
`

const LoadingImage = ({
  loaded,
  onImageLoad,
  setImageRef,
  loaderColor,
  src,
  className,
  ...props
}) => (
  <Container className={className}>
    <StyledLoader color={loaderColor} loaded={loaded} size={'small'} />
    <StyledImage
      loaded={loaded}
      src={src}
      innerRef={setImageRef}
      onLoad={onImageLoad}
      {...props}
    />
  </Container>
)

LoadingImage.propTypes = {
  loaded: PropTypes.bool.isRequired,
  onImageLoad: PropTypes.func.isRequired,
  setImageRef: PropTypes.func.isRequired,
  loaderColor: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
}

LoadingImage.defaultProps = {
  loaderColor: undefined,
  className: undefined,
}

export default compose(
  withState('loaded', 'setLoaded', false),
  withHandlers({
    onImageLoad: ({ loaded, setLoaded }) => () => {
      if (!loaded) {
        setLoaded(true)
      }
    },
    // Set loaded if image already loaded / in cache
    setImageRef: ({ loaded, setLoaded }) => ref => {
      if (!loaded && ref && ref.complete && ref.naturalHeight !== 0) {
        setLoaded(true)
      }
    },
  })
)(LoadingImage)
