import React from 'react'
import PropTypes from 'prop-types'
import styled, { ifProp, prop, rem } from '@nobia/zeus-components/lib/styled'

const Bubbles = styled.ul`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 24px;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const Bubble = styled.li`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${ifProp(
    'active',
    prop('theme.colors.betterBlue40'),
    prop('theme.colors.betterBlue10')
  )};
  margin-left: ${rem(7)};
  &:first-child {
    margin-left: 0;
  }
  z-index: 1;
  cursor: pointer;
  list-style-type: none;
`

const CarouselBubbles = ({ items, offset, setOffset, className }) => (
  <Bubbles className={className}>
    {items.map((item, i) => (
      <Bubble
        key={Math.random()}
        onClick={() => setOffset(i)}
        active={i === offset}
      />
    ))}
  </Bubbles>
)

CarouselBubbles.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
  className: PropTypes.string,
}

CarouselBubbles.defaultProps = {
  className: undefined,
}

export default CarouselBubbles
