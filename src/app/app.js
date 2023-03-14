import ErrorBoundary from '@nobia/zeus-components/lib/errorBoundary'
import { FormattedMessage } from '@nobia/zeus-components/lib/i18n'
import { OverlayDestination } from '@nobia/zeus-components/lib/overlay'
import { PortalProvider } from '@nobia/zeus-components/lib/portal'
import { compose } from '@nobia/zeus-components/lib/recompose'
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from '@nobia/zeus-components/lib/router'
import settings from '@nobia/zeus-components/lib/settings'
import styled, { theme } from '@nobia/zeus-components/lib/styled'
import {
  tracker,
  withRouterTracking,
} from '@nobia/zeus-components/lib/tracking'
import { gtmListener } from '@nobia/zeus-components/lib/tracking/listeners'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ProductsWidget from '../pages/widgets/products-widget'
import GlobalStyles from '../styles/global'
import PageResolver from '../components/page-resolver/PageResolver'

const customEventListener = (e, data) => {
  if (typeof CustomEvent !== 'function') {
    return
  }

  const event = new CustomEvent(e, {
    detail: {
      ...data,
    },
  })

  document.dispatchEvent(event)
}

// Test
tracker.addListener(gtmListener)
tracker.addListener(customEventListener)

const Wrapper = styled.div.attrs({ id: 'opc' })`
  margin-bottom: ${theme('pageMargin.bottom')};
  margin-left: ${theme('pageMargin.marginLeft')};
  margin-right: ${theme('pageMargin.marginRight')};
  ${(props) => props.theme.media.max.md`
    margin: ${theme('app.margin')};
  `};
  ${(props) => props.theme.media.max.sm`
    margin: 0 auto auto;
  `};
  @media (min-width: 1800px) {
    width: 1620px;
    margin: 0 auto auto;
  }
`

const TrackedPortalProvider = withRouterTracking(PortalProvider)

class App extends React.Component {
  static async getInitialProps(ctx) {
    const path = ctx.req ? ctx.req.url : ctx.location && ctx.location.pathname
    // eslint-disable-next-line no-console
    return { path }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location &&
      prevProps.location &&
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.location.pathname.indexOf('---') < 0 &&
      !(
        prevProps.location.pathname.indexOf('---') &&
        this.props.location.pathname.split('/').length === 3
      )
    ) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const defaultGroup = settings.defaultGroup || '/default-group-not-found'

    return (
      <ErrorBoundary>
        <TrackedPortalProvider>
          <Fragment>
            <GlobalStyles />
            <Wrapper>
              <Switch>
                <Route
                  path={`/widgets/products/`}
                  exact
                  component={ProductsWidget}
                />
                <Redirect from="/" exact to={`/${defaultGroup}/`} />
                <PageResolver />
                <Route>
                  <p>
                    <FormattedMessage id="app.not-found.message" />
                  </p>
                </Route>
              </Switch>
            </Wrapper>
            <OverlayDestination />
          </Fragment>
        </TrackedPortalProvider>
      </ErrorBoundary>
    )
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
}

export default compose(withRouter)(App)
