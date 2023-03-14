import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import { withRouter } from '@nobia/zeus-components/lib/router'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import { SubHeadline } from '@nobia/zeus-components/lib/text'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import Dropdown from '../dropdownSimple'

const Wrapper = styled.div`
  margin-top: ${rem(20)};
  margin-bottom: ${rem(20)};
`

const Header = withTranslation('app.product')(styled(SubHeadline)`
  color: ${props => props.theme.colors.secondary};
  text-transform: none;
`)

const StyledDropdownItem = styled.div`
  margin-bottom: ${rem(16)};
`

const VariantList = ({ variants, variantFilter, currentId, history }) => {
  const getKeyedValue = useCallback((key, obj) => {
    let current = { ...obj }
    key.split(/[.]/).forEach(k => {
      if (current) {
        current = current[k]
      }
    })
    return current
  }, [])

  const activeVariant = useMemo(
    () => variants[0].products.find(p => p.id === currentId),
    [variants]
  )

  const vf = useMemo(
    () =>
      variantFilter.map(f => {
        const options = variants[0].products
          .map(p => ({
            value: getKeyedValue(f.filter, p),
            enabled: true,
          }))
          .filter((p, i, a) => a.map(b => b.value).indexOf(p.value) === i)

        return { label: f.label, filter: f.filter, options }
      }),
    [variantFilter, getKeyedValue]
  )

  const activeFilter = useMemo(
    () =>
      vf.reduce(
        (a, c) => ({
          ...a,
          [c.filter]: getKeyedValue(c.filter, activeVariant),
        }),
        {}
      ),
    [activeVariant, vf]
  )

  const updateFilter = useCallback(
    (filter, option) => {
      const bestVariant = variants[0].products
        .filter(v => getKeyedValue(filter, v) === option)
        .map(variant => ({
          variant,
          matches: Object.keys(activeFilter)
            .filter(k => k !== filter)
            .reduce(
              (a, c) =>
                a + (getKeyedValue(c, variant) === activeFilter[c] ? 1 : 0),
              0
            ),
        }))
        .sort((a, b) => b.matches - a.matches)
        .map(p => p.variant)[0]
      const prefix = history.location.pathname.endsWith('/') ? '..' : '.'
      if (bestVariant) {
        history.push(`${prefix}/${bestVariant.slug}/`)
      }
    },
    [variants, history, getKeyedValue, activeFilter]
  )

  return (
    <Wrapper>
      {vf
        .filter(f => f.options.length > 1)
        .map(({ filter, label, options }) => (
          <div key={filter}>
            <Header>{label}</Header>
            <StyledDropdownItem>
              <Dropdown
                options={options}
                value={activeFilter[filter]}
                onSelect={v => updateFilter(filter, v)}
              />
            </StyledDropdownItem>
          </div>
        ))}
    </Wrapper>
  )
}

VariantList.propTypes = {
  variantFilter: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, filter: PropTypes.string })
  ).isRequired,
  variants: PropTypes.arrayOf(
    PropTypes.shape({
      products: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ).isRequired,
  currentId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default withRouter(VariantList)
