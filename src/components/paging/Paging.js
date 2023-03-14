import { withTranslation } from '@nobia/zeus-components/lib/i18n'
import settings from '@nobia/zeus-components/lib/settings'
import styled, { rem, theme } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import React from 'react'

const PagingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-height: 60px;
  margin-top: 8px;
  flex: 1;
  ${props => props.theme.media.max.xs`
    justify-content: space-between;
    width: 100%
  `};
`

const NavButton = styled.div`
  display: flex;
  cursor: pointer;
  margin: ${rem(10)} ${rem(5)};
  padding-top: ${theme('paging.paddingTop')};
  padding: ${rem(10)} ${rem(15)};
  border: 1px solid ${theme('colors.border')};
  color: ${theme('typography.link.color')};

  &:not(.disabled):not(.selected):hover {
    border: 1px solid ${theme('colors.primary')};
    color: ${theme('colors.primary')};
  }

  &.prev {
    margin-left: 0;
  }

  &.next {
    margin-right: 0;
    color: ${theme('colors.secondary')};
  }

  &.selected {
    background-color: ${theme('colors.secondary')};
    color: ${theme('colors.white')};
  }

  &.disabled {
    cursor: default;
  }

  &.nan {
    border: 1px solid transparent;
    line-height: ${rem(12)};
    margin: ${rem(10)} 0;
  }
`

const NavContainer = styled.div`
  display: none;
  ${props => props.theme.media.min.sm`
    display: flex;
  `};
`

const Text = styled.div`
  display: flex;
  margin: ${rem(10)};
  padding: ${rem(10)} ${rem(15)};
  border: 1px solid transparent;
  color: ${theme('colors.primary')};

  ${props => props.theme.media.min.sm`
    display: none;
  `};

  & > span {
    margin: 0 2px;
  }
`

const PagingWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-top: 26px;
  > span {
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`

const Label = withTranslation('app.paging')('span')

const getPreviousPage = current => {
  if (current > 0) {
    return current - 1
  }
  return current
}

const getNextPage = (current, last) => {
  if (current + 1 < last) {
    return current + 1
  }
  return current
}

// eslint-disable-next-line no-unused-vars
const getPages = (max, current) => {
  if (max < 7) {
    return Array(...{ length: max }).map(Number.call, Number) // create array starting at 0 with a length of max. Example: max=4 -> [0,1,2,3]
  }

  const pageNumbers = []

  const startAt = current < 4 ? 0 : current - 3
  const endAt = current > max - 3 ? max : startAt + 7

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < max; i++) {
    if (i >= startAt && i < endAt) {
      pageNumbers.push(i)
    }
  }

  if (pageNumbers.indexOf(0) === -1) {
    // dont add ... if the first number in list is 1, looks weird
    if (pageNumbers[0] !== 1) {
      pageNumbers.unshift('...')
    }
    pageNumbers.unshift(0)
  }

  if (pageNumbers.indexOf(max - 1) === -1) {
    // dont add ... if the last number in list is the number before max, looks weird
    if (pageNumbers[pageNumbers.length - 1] !== max - 2) {
      pageNumbers.push('...')
    }
    pageNumbers.push(max - 1)
  }

  return pageNumbers
}

const Paging = ({ productCount, currentPage, gotoPage }) =>
  productCount > settings.pageSize && (
    <PagingWrapper>
      <span>
        {settings.pageSize * currentPage + 1}-
        {settings.pageSize * (currentPage + 1) >= productCount
          ? productCount
          : settings.pageSize * (currentPage + 1)}{' '}
        of {productCount} Products
      </span>
      <PagingContainer>
        <NavButton
          onClick={() => gotoPage(getPreviousPage(currentPage))}
          className={`prev ${currentPage === 0 ? 'disabled' : ''}`}
        >
          &lt;
        </NavButton>
        <Text>
          <Label intlKey="page" />
          <span>{currentPage + 1}</span>
          <Label intlKey="of" />
          <span>{Math.ceil(productCount / settings.pageSize)}</span>
        </Text>
        <NavContainer>
          {getPages(
            Math.ceil(productCount / settings.pageSize),
            currentPage
          ).map(page => (
            <NavButton
              key={page}
              onClick={isNaN(page) ? () => {} : () => gotoPage(page)}
              className={`${isNaN(page) ? 'disabled nan' : ''}${
                page === currentPage ? 'selected' : ''
              }`}
            >
              {isNaN(page) ? page : page + 1}
            </NavButton>
          ))}
        </NavContainer>
        <NavButton
          onClick={() =>
            gotoPage(
              getNextPage(
                currentPage,
                Math.ceil(productCount / settings.pageSize)
              )
            )
          }
          className={`next ${
            currentPage + 1 === Math.ceil(productCount / settings.pageSize)
              ? 'disabled'
              : ''
          }`}
        >
          &gt;
        </NavButton>
      </PagingContainer>
    </PagingWrapper>
  )

Paging.propTypes = {
  productCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
}

export default Paging
