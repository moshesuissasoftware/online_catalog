import React from 'react'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import Container from '@nobia/zeus-components/lib/grid/Container'
import { Paragraph } from '@nobia/zeus-components/lib/text'
import { Icon } from '@nobia/zeus-components/lib/icons'
import Link from '@nobia/zeus-components/lib/text/Link'

const SidePanel = styled.div`
  padding: ${rem(24)};
  height: 100%;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  width: 460px;
  border: 1px solid #bbb;
  border-top: 0;
  right: 0;
  top: 0;
  -webkit-animation: slideIn 1s forwards;
  -moz-animation: slideIn 1s forwards;
  animation: slideIn 1s forwards;
  overflow: scroll;
  @-webkit-keyframes slideIn {
    0% {
      transform: translateX(900px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @-moz-keyframes slideIn {
    0% {
      transform: translateX(900px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slideIn {
    0% {
      transform: translateX(900px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @media (max-width: 458px) {
    width: 100%;
    min-height: auto;
  }
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  -webkit-animation: fadeIn 1s forwards;
  -moz-animation: fadeIn 1s forwards;
  animation: fadeIn 1s forwards;
  @keyframes fadeIn {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`

const StyledContainer = styled(Container)`
  padding: 0;
`

const Heading = styled.h1`
  font-family: ${theme('categoryCard.fontFamily')};
  margin-top: ${rem(36)};
  font-weight: 500;
  font-size: ${rem(24)};
`
const SubHeading = styled.h4`
  margin: ${rem(24)} 0 ${rem(16)} 0;
  font-family: ${theme('categoryCard.fontFamily')};
`
const StyledList = styled.ul`
  padding: 0 0 ${rem(20)} ${rem(18)};
  & > li:first-child {
    padding-top: 0;
  }
  & > li {
    padding: ${rem(4)} 0;
  }
`
const StyledLink = styled(Link)`
  color: ${theme('typography.link.color')};
  font-size: ${rem(16)};
  cursor: pointer;
`
const Close = styled(Icon).attrs({
  type: 'close',
  width: 16,
  height: 16,
})`
  position: absolute;
  top: ${rem(24)};
  right: ${rem(24)};
  z-index: 1;
  cursor: pointer;
  > svg {
    width: ${rem(16)};
    height: ${rem(16)};
  }
  ${props => props.theme.media.min.md`
      top: ${rem(20)};
      right: ${rem(20)};
      > svg {
        width: ${rem(20)};
        height: ${rem(20)};
      }
    `};
`
const Sidebar = ({
  onCloseSidebar,
  heading,
  body,
  title,
  listItems,
  linkText,
  url,
}) => {
  const onLinkClick = () => {
    onCloseSidebar()
  }
  return (
    <>
      <Overlay onClick={onLinkClick} />
      <SidePanel>
        <Close onClick={onLinkClick} />
        <StyledContainer>
          {heading && <Heading>{heading}</Heading>}
          {title && <SubHeading>{title}</SubHeading>}
          {body && <Paragraph>{body}</Paragraph>}
          {listItems && (
            <StyledList>
              {listItems.map(listItem => (
                <li>{listItem}</li>
              ))}
            </StyledList>
          )}
          <StyledLink href={url}>{linkText}</StyledLink>
        </StyledContainer>
      </SidePanel>
    </>
  )
}

Sidebar.propTypes = {
  onCloseSidebar: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.string),
  linkText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

Sidebar.defaultProps = {
  title: '',
  listItems: [],
}

export default Sidebar
