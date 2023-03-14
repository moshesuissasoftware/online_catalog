import React from 'react'
import PropTypes from 'prop-types'
import styled, { prop, rem } from '@nobia/zeus-components/lib/styled'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import { Column } from '@nobia/zeus-components/lib/grid'
import Button from '@nobia/zeus-components/lib/buttons'

const StyledColumn = styled(Column)`
  text-align: center;
`

const StyledButton = styled(Button)`
  margin-top: 50%;
  margin-bottom: ${prop('theme.grid.gutter')};
  ${props => props.theme.media.max.sm`
    padding-left: ${rem(8)};
    padding-right: ${rem(8)};
  `};
`
const Label = styled(withTranslation('app.product')('span'))`
  &::before {
    content: '+ ';
    position: relative;
    bottom: -0.05em;
    font-size: 1.5em;
    line-height: 1rem;
  }
`

const AddColumn = ({ onAdd, className }) => (
  <StyledColumn className={className} size={6} md={3}>
    <StyledButton size="small" onClick={onAdd}>
      <Label intlKey="select_to_compare">Add</Label>
    </StyledButton>
  </StyledColumn>
)

AddColumn.propTypes = {
  onAdd: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AddColumn.defaultProps = {
  className: undefined,
}

export default AddColumn
