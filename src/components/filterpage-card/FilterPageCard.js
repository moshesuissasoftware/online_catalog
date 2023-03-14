import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  ContainerStyle,
  DescriptionWrapper,
  FilterPagePreamble,
  FilterPageTitle,
  Glass,
  ImageContainer,
  StyledFilterPageDescription,
  StyledImage,
  StyledLink,
} from './filterpage-card-styles'

function useIntersection(options) {
  const [observerEntry, setEntry] = useState({})
  const elRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => setEntry(entries[0]),
      options
    )
    observer.observe(elRef.current)
    return () => observer.disconnect()
  }, [elRef])
  return { observerEntry, elRef }
}

const FilterPageCard = ({ filterPage }) => {
  const { observerEntry, elRef } = useIntersection({ threshold: 1 })
  const truncate = str =>
    str?.length > 80 ? `${str.substr(0, 80 - 1)}...` : str

  const pathname = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname

  const categories = document.getElementsByClassName('divr')
  if (document.getElementsByClassName('divr').length <= 1) {
    /* eslint-disable no-plusplus */
    for (let i = 0; i < categories.length; i++) {
      categories[i].style.width = '290px'
    }
  } else {
    /* eslint-disable no-plusplus */
    for (let s = 0; s < categories.length; s++) {
      categories[s].style.width = '100%'
    }
  }
  return (
    <StyledLink
      className={'divr'}
      rel={'preload'}
      to={`${pathname}/${filterPage.slug}`}
      data-cy="FilterPageCard"
    >
      <div
        ref={elRef}
        data-visible={observerEntry.isIntersecting}
        style={ContainerStyle}
      >
        <Glass />
        <ImageContainer>
          <StyledImage
            style={{
              width: '100%',
              height: '100%',
            }}
            src={filterPage.image}
            title={filterPage.name}
            alt={filterPage.name}
          />
        </ImageContainer>

        <StyledFilterPageDescription>
          <DescriptionWrapper>
            <FilterPageTitle>{filterPage.name}</FilterPageTitle>
            <FilterPagePreamble
              dangerouslySetInnerHTML={{
                __html: truncate(filterPage.preamble),
              }}
            />
          </DescriptionWrapper>
        </StyledFilterPageDescription>
      </div>
    </StyledLink>
  )
}

FilterPageCard.propTypes = {
  filterPage: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    slug: PropTypes.string,
    preamble: PropTypes.string,
  }).isRequired,
  group: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    preamble: PropTypes.string,
  }).isRequired,
}

export default FilterPageCard
