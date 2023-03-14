import { PortalProvider } from '@nobia/zeus-components/lib/portal'
import Root from '@nobia/zeus-components/lib/root'
import settings from '@nobia/zeus-components/lib/settings'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

const renderApp = () => {
  ReactDOM.render(
    <Root
      apiUrl={settings.gatewayAPI}
      brand={settings.brand}
      persistSharedState
    >
      <PortalProvider>
        <App />
      </PortalProvider>
    </Root>,
    document.getElementById('root')
  )
}

renderApp()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', renderApp)
}
