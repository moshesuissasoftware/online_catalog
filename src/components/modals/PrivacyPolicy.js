import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  compose,
  withState,
  withHandlers,
} from '@nobia/zeus-components/lib/recompose'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import styled, { rem, ifProp } from '@nobia/zeus-components/lib/styled'
import { Title, Paragraph } from '@nobia/zeus-components/lib/text'

const StyledTitle = styled(Title)`
  cursor: pointer;
  text-align: center;
  font-size: ${rem(16)};
  margin-top: ${rem(16)};
  margin-bottom: ${rem(16)};

  &::before {
    content: '+ ';
  }

  &[aria-expanded='true']::before {
    content: '- ';
  }
`

const StyledParagraph = styled(Paragraph)`
  text-align: left;
  display: ${ifProp('expanded', 'block', 'none')};
`

const PrivacyPolicy = ({ expanded, toggleExpanded, getString }) => (
  <Fragment>
    <StyledTitle
      onClick={toggleExpanded}
      role="button"
      aria-controls="privacy-policy-paragraph"
      aria-expanded={`${expanded}`}
    >
      {getString('title')}
    </StyledTitle>
    <StyledParagraph id="privacy-policy-paragraph" expanded={expanded}>
      <div
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: getString('message') }}
      />
    </StyledParagraph>
  </Fragment>
)

PrivacyPolicy.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  getString: PropTypes.func.isRequired,
}

export default compose(
  injectIntl,
  withState('expanded', 'setExpanded', false),
  withHandlers({
    toggleExpanded: ({ setExpanded }) => () =>
      setExpanded(expanded => !expanded),
    getString: ({ intl }) => (id, defaultMessage, values) =>
      intl.formatMessage(
        {
          id: `app.modals.wishlist.privacy-policy.${id}`,
          defaultMessage,
        },
        values
      ),
  })
)(PrivacyPolicy)
