import React, { useEffect, useState, useRef } from 'react'
import styled, { theme } from '@nobia/zeus-components/lib/styled'
import PropTypes from 'prop-types'
import { withTranslation } from '@nobia/zeus-components/lib/i18n'

const ButtonLink = styled.button`
  background: none !important;
  font-size: 16px;
  border: none;
  padding: 0 !important;
  /*input has OS specific font-family*/
  text-decoration: underline;
  cursor: pointer;
  float: left;
  color: #122126;
  margin: 8px 0 0 0;
  display: none;
  ${(props) => props.theme.media.max.sm`
    display: block;
  `}
`

const ReadMoreWrapper = styled.div`
  min-height: ${theme('readmore.minHeight')};
  line-height: 33px;
  margin-bottom: 2px;
  > div {
    margin: 0 !important;
  }
  overflow: hidden;
`

const ReadMoreText = styled.div``
const TranslatedSpan = withTranslation('app.preamble')('span')

const ReadMore = ({ children }) => {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const wrapperRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) {
      return
    }

    if (wrapperRef.current.offsetHeight < textRef.current.scrollHeight) {
      setShowButton(true)
    }
  }, [wrapperRef, textRef])

  return (
    <div>
      <ReadMoreWrapper
        ref={wrapperRef}
        className={
          // eslint-disable-next-line
          children.props.dangerouslySetInnerHTML.__html.length < 40
            ? 'rm-height read-more-wrapper'
            : 'read-more-wrapper'
        }
      >
        <ReadMoreText
          ref={textRef}
          className={
            !showContent ? 'read-more-inner' : 'read-more-inner read-more'
          }
        >
          {children}
        </ReadMoreText>
      </ReadMoreWrapper>
      {showButton && (
        <span>
          {!showContent ? (
            <ButtonLink onClick={() => setShowContent(!showContent)}>
              <TranslatedSpan intlKey={'read_more'} />
            </ButtonLink>
          ) : (
            <ButtonLink onClick={() => setShowContent(!showContent)}>
              <TranslatedSpan intlKey={'read_less'} />
            </ButtonLink>
          )}
        </span>
      )}
    </div>
  )
}

ReadMore.propTypes = {
  children: PropTypes.shape({}).isRequired,
}
export default ReadMore
