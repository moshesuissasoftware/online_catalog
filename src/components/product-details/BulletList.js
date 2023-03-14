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
  &.bullet-tiny {
    padding-left: 1em;
    margin-bottom: 8px;
    > li {
      font-size: 12px;
      margin-bottom: 8px;
      line-height: 18px;
      svg {
        width: 0.8em;
        height: 0.8em;
        margin: 0 2px 1px 0;
      }
    }
  }
`

const Bullet = styled.li`
  margin-bottom: ${theme('list.marginBottom')};
  text-indent: -12px;
  width: 100%;
`

const BulletIcon = styled(Icon).attrs({ type: 'dot-filled' })`
  > svg {
    color: ${theme('colors.primary')};
  }
`

const BulletList = ({ bullets, className }) =>
  !!bullets && (
    <Bullets className={className}>
      {bullets.map((bullet, i) => (
        <Bullet key={`${bullet}_${i.toString()}`}>
          <BulletIcon>{bullet}</BulletIcon>
        </Bullet>
      ))}
    </Bullets>
  )
BulletList.propTypes = {
  bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
}

BulletList.defaultProps = {
  className: undefined,
}

export default BulletList
