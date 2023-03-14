import React from 'react'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import { Icon } from '@nobia/zeus-components/lib/icons'

const CollapseContainer = styled.div`
  padding: 0;
  border-top: 1px solid ${theme('collapse.border.color')};
  ${props => props.theme.media.max.sm`
    border-top: none;
    border-bottom: 1px solid ${theme('collapse.border.color')};
  `}
`
const CollapseButton = styled.button`
  display: block;
  width: 100%;
  padding-left: 0;
`
const StyledTitle = styled.span`
  float: left;
  font-family: ${theme('categoryCard.fontFamily')};
  padding: 24px 0;
  font-weight: ${theme('collapse.fontWeight')};
  font-size: ${rem(16)};
  ${props => props.theme.media.max.sm`
    padding: 16px 0;
  `}
`
const StyledIcons = styled.span`
  font-weight: 100;
  color: #192228;
  padding-top: 12px;
  font-size: ${rem(20)};
  margin-top: ${rem(10)};
  float: right;
  ${props => props.theme.media.max.sm`
    padding-top: 4px;
  `}
`
const CollapsedContent = styled.div`
  > dl {
    margin-top: 0;
    > div {
      padding: ${rem(16)};
    }
  }
  dt {
    font-weight: 500;
    padding-left: 0;
    font-size: ${theme('productViewTable.fontSize')};
  }
  dd {
    font-weight: 300;
    margin-left: 24px;
    font-size: ${theme('productViewTable.fontSize')};
  }
  ${props => props.theme.media.max.sm`
    dd {
    max-width: 160px;
    text-align: right;
    }
  `}
`

const Collapse = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(window.innerWidth <= 450)

  return (
    <CollapseContainer>
      <div>
        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <StyledTitle>{title}</StyledTitle>
          <StyledIcons>
            {' '}
            {isCollapsed ? (
              <Icon type="plus" width={25} height={25} />
            ) : (
              <Icon type="dash" width={25} height={25} />
            )}
          </StyledIcons>
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

Collapse.propTypes = {
  children: PropTypes.shape({}).isRequired,
  title: PropTypes.shape({}).isRequired,
}
export default Collapse
