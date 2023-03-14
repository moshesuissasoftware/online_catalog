import React from 'react'
import PropTypes from 'prop-types'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { Icon } from '@nobia/zeus-components/lib/icons'

const paddingLeft = '1.5em'
const Bullets = styled.ul`
  list-style-type: none;
  padding-left: ${paddingLeft};
  margin-top: ${rem(20)};
  margin-bottom: ${rem(30)};
  color: ${theme('colors.primary')};
  font-size: ${theme('paragraph.fontSize')};
`

const Bullet = styled.li`
  margin-bottom: ${theme('list.marginBottom')};
  text-indent: -${paddingLeft};
  width: 100%;
`

const BulletIcon = styled(Icon).attrs({ type: 'checkmark' })`
  > svg {
    color: ${theme('colors.primary')};
  }
`

const CheckmarkList = ({ bullets, className }) =>
  !!bullets && (
    <Bullets className={className}>
      {bullets.map((bullet, i) => (
        <Bullet key={`${bullet}_${i.toString()}`}>
          <BulletIcon>{bullet}</BulletIcon>
        </Bullet>
      ))}
    </Bullets>
  )
CheckmarkList.propTypes = {
  bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
}

CheckmarkList.defaultProps = {
  className: undefined,
}

export default CheckmarkList
