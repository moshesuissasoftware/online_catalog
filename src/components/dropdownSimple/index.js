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
import React, { useCallback } from 'react'

const HeaderItem = styled(Paragraph)`
  text-align: left;
  padding: ${rem(10)};
  background: ${prop('theme.colors.backgroundPrimary')};
  margin: 0;
  border: 1px solid ${theme('colors.border')};
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
  border: ${props =>
    props.expanded ? `1px solid ${props.theme.colors.border}` : 'none'};
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

const Dropdown = ({
  options,
  value,
  labelSelector,
  valueSelector,
  onSelect,
  expanded,
  toggle,
}) => {
  const isSelected = useCallback(
    option => {
      const selectedValue = valueSelector(value)
      const optionValue = valueSelector(option)
      if (optionValue === selectedValue) {
        return true
      }
      const parts = (selectedValue && selectedValue.split('+')) || []
      return parts.some(part => part === optionValue)
    },
    [value, valueSelector]
  )

  return (
    <ListItemWrapper onClick={toggle} data-cy="Dropdown">
      <ListItem>
        <HeaderItem>
          {labelSelector(value)}
          <StyledIcon>{expanded ? '-' : '+'}</StyledIcon>
        </HeaderItem>
        {expanded && (
          <DropDownItemWrapper expanded={expanded}>
            <StyledDropDown>
              {options.map(option => (
                <DropDownItem
                  key={valueSelector(option.value)}
                  enabled={option.enabled}
                  selected={isSelected(option.value)}
                  onClick={() => option.enabled && onSelect(option.value)}
                >
                  {labelSelector(option.value)}
                  {isSelected(option.value) && !option.first && (
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
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      enabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelSelector: PropTypes.func,
  valueSelector: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  value: null,
  labelSelector: value => value,
  valueSelector: value => value,
}

const enhance = compose(
  withState('expanded', 'setExpanded', false),
  withHandlers({
    toggle: ({ setExpanded }) => () => setExpanded(expanded => !expanded),
  }),
  withClickOutside(({ setExpanded }) => setExpanded(false))
)

export default enhance(Dropdown)
