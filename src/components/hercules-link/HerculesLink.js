import React from 'react'
import PropTypes from 'prop-types'
import settings from '@nobia/zeus-components/lib/settings'
import { Link } from '@nobia/zeus-components/lib/router'

const HerculesLink = ({ to, ...props }) =>
  Array.isArray(settings.herculesPaths) &&
  settings.herculesPaths.includes(to) ? (
    <a href={to} {...props} />
  ) : (
    <Link to={to} {...props} />
  )

HerculesLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default HerculesLink
