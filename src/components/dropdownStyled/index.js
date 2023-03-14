import { tint } from '@nobia/zeus-components/lib/helpers/polished'
import {
  compose,
  withHandlers,
  withState,
} from '@nobia/zeus-components/lib/recompose'
import styled, {
  ifProp,
  prop,
  rem,
  theme,
  withProp,
} from '@nobia/zeus-components/lib/styled'
import { Icon } from '@nobia/zeus-components/lib/icons'
import { Paragraph } from '@nobia/zeus-components/lib/text'
import withClickOutside from '@nobia/zeus-components/lib/withClickOutside'
import PropTypes from 'prop-types'
import React from 'react'

const HeaderItem = styled(Paragraph)`
  text-align: left;
  padding: ${rem(10)};
  background: ${prop('theme.colors.backgroundPrimary')};
  margin: 0;
  border-top: 2px solid ${theme('categoryCard.backgroundColor')};
  padding-right: 0px;
  padding-left: 0px;
`

const ListItemWrapper = styled.li`
  cursor: pointer;
  width: 100%;
  min-width: ${rem(120)};
  margin-bottom: ${theme('grid.gutter') / 2};
  list-style-type: none;
  @media (min-width: 960px) {
    min-width: ${rem(180)};
  }
`
const ListItem = styled.div`
  position: relative;
`

const StyledDropDown = styled.ul`
  text-align: left;
  width: 100%;
  padding-left: 0;
  border-top: none;
  background: white;
  list-style-type: none;
  margin-left: ${theme('filters.marginLeft')};
  &::-webkit-scrollbar {
    display: none;
  }
`
const DropDownItemWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 20;
  transition: max-height ease-in-out 0.1s;
  max-height: ${props => (props.expanded ? rem(250) : 0)};
  overflow: auto;
  overflow-x: hidden;
  border-top: 2px solid ${theme('background.backgroundColor')};
  border-bottom: ${props => (props.expanded ? `2px solid #F6EBE1` : 'none')};
  border-top: none;
`

const lightText = amount => withProp('theme.colors.primary', tint(amount))

const DropDownItem = styled.li`
  color: ${ifProp('enabled', prop('theme.colors.primary'), lightText(0.5))};
  cursor: ${ifProp('enabled', 'pointer', 'default')};
  background: ${ifProp(
    'selected',
    theme('colors.border'),
    theme('colors.backgroundPrimary')
  )};
  list-style-type: none;
  padding: ${rem(10)};

  > span > svg {
    margin-left: ${rem(5)};
  }
`

const StyledIcon = styled.span`
  float: right;
  > svg {
    pointer-events: none;
  }
`

const isSelected = (selected, value) => {
  if (selected === value) {
    return true
  }
  const parts = (selected && selected.split('+')) || []
  let match = false
  parts.forEach(part => {
    if (part === value) {
      match = true
    }
  })
  return match
}

const Dropdown = ({
  options,
  selected,
  header,
  children,
  select,
  expanded,
  toggle,
}) => (
  <ListItemWrapper onClick={toggle} expanded={expanded} data-cy="Dropdown">
    <ListItem expanded={expanded}>
      <HeaderItem>
        {header(selected)}
        <StyledIcon>{expanded ? '–' : '+'}</StyledIcon>
      </HeaderItem>
      {expanded && (
        <DropDownItemWrapper expanded={expanded}>
          <StyledDropDown>
            {options.map(option => (
              <DropDownItem
                key={option.value}
                enabled={option.enabled}
                selected={isSelected(selected, option.value)}
                onClick={() => option.enabled && select(option.value)}
              >
                {children(option.value)}
                {isSelected(selected, option.value) && !option.first && (
                  <Icon
                    width={10}
                    height={10}
                    type="checkmark"
                    color={theme('theme.colors.primary')}
                  />
                )}
              </DropDownItem>
            ))}
          </StyledDropDown>
        </DropDownItemWrapper>
      )}
    </ListItem>
  </ListItemWrapper>
)

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      enabled: PropTypes.bool,
    })
  ).isRequired,
  selected: PropTypes.string,
  header: PropTypes.func,
  children: PropTypes.func,
  select: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  selected: null,
  children: value => value,
  header: value => value,
}

const enhance = compose(
  withState('expanded', 'setExpanded', false),
  withHandlers({
    toggle: ({ setExpanded }) => () => setExpanded(expanded => !expanded),
  }),
  withClickOutside(({ setExpanded }) => setExpanded(false))
)

export default enhance(Dropdown)
