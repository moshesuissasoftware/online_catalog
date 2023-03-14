import React from 'react'
import PropTypes from 'prop-types'
import styled, { prop, rem } from '@nobia/zeus-components/lib/styled'
import { Icon } from '@nobia/zeus-components/lib/icons'
import { Headline, Paragraph, Title } from '@nobia/zeus-components/lib/text'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${props => props.theme.media.min.md`
    width: auto;
    max-width: 80%;
    height: auto;
    max-height: 90%;
  `};
`

const ScrollWrapper = styled.div`
  text-align: center;
  background: ${prop('theme.colors.backgroundPrimary')};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${rem(50)} ${prop('theme.grid.gutter')} ${prop('theme.grid.gutter')};

  width: 100%;
  height: 100%;
  ${props => props.theme.media.min.md`
    width: auto;
    height: auto;
    max-height: 90vh;
  `};

  ${Headline} {
    ${props => props.theme.media.min.md`
      margin-left: ${rem(80)};
      margin-right: ${rem(80)};
    `};
  }

  ${Paragraph}, ${Title} {
    max-width: ${rem(600)};
    margin-left: auto;
    margin-right: auto;
    ${props => props.theme.media.min.md`
      padding-left: ${prop('theme.grid.gutter')};
      padding-right: ${prop('theme.grid.gutter')};
    `};
  }
`

const Close = styled(Icon).attrs({
  type: 'close',
  width: 20,
  height: 20,
})`
  position: absolute;
  top: ${rem(20)};
  right: ${rem(20)};
  z-index: 1;
  cursor: pointer;
  > svg {
    width: ${rem(15)};
    height: ${rem(15)};
  }
  ${props => props.theme.media.min.md`
    top: ${rem(20)};
    right: ${rem(20)};
    border: 2px solid;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    padding: 3px 5px;
    text-align: center;
    > svg {
      width: 10px;
      height: 10px;
    }
  `};
`

const Modal = ({ setClosed, children, className }) => (
  <Wrapper data-cy="Modal" className={className}>
    <Close data-cy="Close" onClick={setClosed} />
    <ScrollWrapper>{children}</ScrollWrapper>
  </Wrapper>
)

Modal.propTypes = {
  setClosed: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
}

Modal.defaultProps = {
  children: undefined,
  className: undefined,
}

export default Modal
