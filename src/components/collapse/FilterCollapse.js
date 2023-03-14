import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@nobia/zeus-components/lib/icons'
import {
  CollapseButton,
  CollapseContainer,
  CollapsedContent,
  StyledIcons,
  StyledTitle,
} from './filter-collapse-styles'

const FilterCollapse = ({ children, title }) => {
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

FilterCollapse.propTypes = {
  children: PropTypes.shape({}).isRequired,
  title: PropTypes.shape({}).isRequired,
}
export default FilterCollapse
