import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from '@nobia/zeus-components/lib/recompose'
import { injectIntl } from '@nobia/zeus-components/lib/i18n'
import { Headline, Paragraph } from '@nobia/zeus-components/lib/text'
import Modal from './Modal'

const ThankyouModal = ({ getString, ...props }) => (
  <Modal {...props}>
    <Headline data-cy="ThankyouModalTitle">{getString('title')}</Headline>
    <Paragraph>{getString('message')}</Paragraph>
  </Modal>
)

ThankyouModal.propTypes = {
  getString: PropTypes.func.isRequired,
}

export default compose(
  injectIntl,
  withHandlers({
    getString: ({ intl }) => (id, defaultMessage, values) =>
      intl.formatMessage(
        {
          id: `app.modals.thankyou.${id}`,
          defaultMessage,
        },
        values
      ),
  })
)(ThankyouModal)
