import React from 'react'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import PropTypes from 'prop-types'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { Icon } from '@nobia/zeus-components/lib/icons'
import FilterValues from '../filter/FilterValues'

const SidePanel = styled.div`
  overflow-y: scroll;
  top: 0px;
  height: 100%;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  width: 460px;
  border: 1px solid #bbb;
  right: 0;
  -webkit-animation: slideIn 1s forwards;
  -moz-animation: slideIn 1s forwards;
  animation: slideIn 1s forwards;
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
  }
`

const Close = styled(Icon).attrs({
  type: 'close',
  width: 16,
  height: 16,
})`
  position: sticky;
  float: right;
  top: 18px;
  right: 24px;
  z-index: 3;
  cursor: pointer;
  > svg {
    width: ${rem(16)};
    height: ${rem(16)};
  }
  ${props => props.theme.media.min.md`
        top: ${rem(20)};
        right: ${rem(32)};
        > svg {
          width: ${rem(20)};
          height: ${rem(20)};
        }
      `};
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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

const OverlayContent = styled.div`
  border-color: #d49b6b;
  height: fit-content;
  list-style-type: none;
  position: sticky;
  left: 0;
  top: 0;
  height: 55px;
  background-color: #fff;
  z-index: 2;
  margin-bottom: 6px;
`
const StyledTitleFilter = styled.div`
  padding: 16px 0 16px 0;
  font-family: ${theme('categoryCard.fontFamily')};
  width: 100%;
  font-size: 21px;
  text-align: left;
  font-weight: 500;
`
const TranslatedSpan = withTranslation('app.filter')('span')

const Container = styled.div`
  padding: 0 16px 16px 16px;
  height: auto;
  min-height: calc(100vh - 82px);
`
const BottomButtons = styled.div`
  height: 80px;
  position: sticky;
  bottom: 0px;
  left: 0;
  width: calc(100vw - 2px);
  box-shadow: 0 -2px 8px 0 rgba(18, 33, 38, 0.15);
  padding: 16px;
  background: #fff;
`

const BaseButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  padding: 12.5px;
  border-radius: 3px;
  width: calc(50% - 8px);
  color: #fff;
  text-transform: uppercase;
`

const ClearButton = styled(BaseButton)`
  background-color: #c9cbcd;
  margin-left: 8px;
`

const ViewButton = styled(BaseButton)`
  background-color: #122126;
  margin-right: 8px;
  border: 1px solid;
`

const FilterSidebar = ({
  onCloseSidebar,
  options,
  total,
  activeFilter,
  updateFilter,
  clearFilter,
}) => {
  const onCloseClick = () => {
    onCloseSidebar()
  }
  return (
    <>
      <Overlay onClick={onCloseClick} />
      <SidePanel>
        <Container>
          <Close onClick={onCloseClick} />
          <OverlayContent key={options[0].key}>
            <StyledTitleFilter>
              <TranslatedSpan intlKey={'filterby'} />
            </StyledTitleFilter>
          </OverlayContent>
          <FilterValues
            options={options}
            activeFilter={activeFilter}
            updateFilter={updateFilter}
            clearFilter={clearFilter}
          />
        </Container>
        <BottomButtons>
          <ViewButton onClick={onCloseClick}>
            <TranslatedSpan intlKey={'view'} />
            {total}
          </ViewButton>
          <ClearButton
            className={
              Object.keys(activeFilter).length > 0 ? 'clear-filters' : ''
            }
            activeFilter={activeFilter}
            onClick={() => clearFilter(options)}
          >
            <TranslatedSpan intlKey={'clearfilter'} />
          </ClearButton>
        </BottomButtons>
      </SidePanel>
    </>
  )
}

FilterSidebar.propTypes = {
  onCloseSidebar: PropTypes.func.isRequired,
  total: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      filterType: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          enabled: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
  updateFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.objectOf(PropTypes.shape({})).isRequired,
  clearFilter: PropTypes.func.isRequired,
}

FilterSidebar.defaultProps = {
  total: 0,
}

export default FilterSidebar
