import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Column } from '@nobia/zeus-components/lib/grid'
import {
  branch,
  compose,
  renderComponent,
} from '@nobia/zeus-components/lib/recompose'
import styled, { prop, rem } from '@nobia/zeus-components/lib/styled'
import { gql } from '@nobia/zeus-components/lib/apollo'
import { graphql } from '@nobia/zeus-components/lib/apollo-hoc'
import Markdown from '@nobia/zeus-components/lib/markdown'
import Status from 'react-nested-status'

const StyledRow = styled(Row)`
  margin-top: ${rem(30)};
`

const StyledMarkdown = styled(Markdown)`
  & > h1 {
    text-align: ${prop('theme.markdown.header.textAlign')};
  }
  & > p {
    margin-bottom: ${prop('theme.markdown.paragraph.marginBottom')};
  }
`

const NotFound = ({ data }) => (
  <Status code={404}>
    <Container>
      <StyledRow>
        <Column sm={2} />
        <Column sm={8}>
          <StyledMarkdown>
            {(data && data.content && data.content.opcNotFound) || '404'}
          </StyledMarkdown>
        </Column>
        <Column sm={2} />
      </StyledRow>
    </Container>
  </Status>
)

NotFound.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.shape({
      opcNotFound: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const NotFoundQuery = gql`
  query GetNotFoundText {
    content {
      opcNotFound
    }
  }
`

const withNotFound = predicate =>
  branch(predicate, compose(graphql(NotFoundQuery), renderComponent(NotFound)))

export default withNotFound
