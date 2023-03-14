import React from 'react'
import {
  compose,
  branch,
  renderComponent,
} from '@nobia/zeus-components/lib/recompose'
import styled, { rem } from '@nobia/zeus-components/lib/styled'
import { Container, Row, Column } from '@nobia/zeus-components/lib/grid'
import { ErrorMessage } from '@nobia/zeus-components/lib/errorBoundary'
import LoadingIndicator from '@nobia/zeus-components/lib/loadingIndicator'

const StyledRow = styled(Row)`
  margin-top: ${rem(30)};
  height: 100vh;
`

const Loader = () => (
  <Container>
    <StyledRow>
      <Column>
        <LoadingIndicator size={'small'} center />
      </Column>
    </StyledRow>
  </Container>
)

const WrappedErrorMessage = props => (
  <Container>
    <StyledRow>
      <Column>
        <ErrorMessage {...props} />
      </Column>
    </StyledRow>
  </Container>
)

export default compose(
  branch(({ data }) => data.loading, renderComponent(Loader)),
  branch(({ data }) => data.error, renderComponent(WrappedErrorMessage))
)
