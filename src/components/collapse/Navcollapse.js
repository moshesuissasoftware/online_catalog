import React from 'react'
import styled, { theme } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import Icon from '@nobia/zeus-components/lib/icons/Icon'

const CollapseContainer = styled.div`
  padding: 16px 0;
  border-top: 1px solid ${theme('collapse.border.color')};
  border-bottom: 1px solid ${theme('collapse.border.color')};
  @media (max-width: 767px) {
    border: 1px solid #c9cbcd;
    border-radius: 3px;
    padding: 10px;
  }
`
const CollapseButton = styled.button`
  display: block;
  width: 100%;
  padding-left: 0;
  min-height: 24px;
`
const StyledTitle = styled.span`
  float: left;
  font-family: ${theme('categoryCard.fontFamily')};
  font-weight: 500;
  font-size: 18px;
  @media (max-width: 767px) {
    padding-bottom: 0;
    font-size: 16px;
    font-family: Campton;
    font-weight: 300;
    color: #697175;
  }
  @media (min-width: 767px) {
    width: calc(100% - 12px);
    text-align: left;
  }
`
const UpIcon = styled(Icon).attrs({ type: 'chevron-down' })`
  > svg {
    height: 15px;
    margin: 4px 6px 0 0;
  }
`
const DownIcon = styled(Icon).attrs({ type: 'chevron-up' })`
  > svg {
    height: 15px;
    margin: 4px 6px 0 0;
  }
`
const StyledIconsMd = styled.span`
  color: #001c33;
  font-weight: 100;
  font-size: 20px;
  position: absolute;
  right: 12px;
  @media (max-width: 767px) {
    display: none;
  }
`
const StyledIconsSm = styled.span`
  font-weight: 100;
  color: #001c33;
  font-size: 20px;
  float: right;
  @media (min-width: 767px) {
    display: none;
  }
`
const CollapsedContent = styled.div``

const NavCollapse = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(window.innerWidth <= 767)

  return (
    <CollapseContainer>
      <div>
        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <StyledTitle>{title}</StyledTitle>
          <StyledIconsMd>
            {isCollapsed ? (
              <Icon type="plus" width={25} height={25} />
            ) : (
              <Icon type="dash" width={25} height={25} />
            )}
          </StyledIconsMd>
          <StyledIconsSm>
            {isCollapsed ? <UpIcon /> : <DownIcon />}
          </StyledIconsSm>
        </CollapseButton>
        {!isCollapsed && (
          <CollapsedContent aria-expanded={isCollapsed}>
            {children}
          </CollapsedContent>
        )}
      </div>
    </CollapseContainer>
  )
}

NavCollapse.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
}
export default NavCollapse
