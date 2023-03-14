import React from 'react'
import PropTypes from 'prop-types'
import {
  BannerWrapper,
  BannerContainer,
  BannerTitle,
  LeftColumn,
  RightColumn,
  BannerPreamble,
  BannerLink,
} from './filterpages-banner-styles'

const FilterPagesBanner = ({ banner }) => (
  <BannerWrapper>
    <BannerContainer img={banner.backgroundImage}>
      <LeftColumn>
        <BannerTitle>{banner.title}</BannerTitle>
        <BannerPreamble>{banner.preamble}</BannerPreamble>
      </LeftColumn>
      <RightColumn>
        <BannerLink href={banner.buttonLink}>
          {banner.buttonLinkText}
        </BannerLink>
      </RightColumn>
    </BannerContainer>
  </BannerWrapper>
)

FilterPagesBanner.propTypes = {
  banner: PropTypes.shape({
    title: PropTypes.string,
    preamble: PropTypes.string,
    buttonLink: PropTypes.string,
    backgroundImage: PropTypes.string,
    buttonLinkText: PropTypes.string,
  }).isRequired,
}

export default FilterPagesBanner
