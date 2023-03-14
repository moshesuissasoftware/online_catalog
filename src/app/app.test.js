/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import Root from '@nobia/zeus-components/lib/root'
import App from './app'

jest.mock('@nobia/zeus-components/lib/settings', () => ({
  defaultGroup: 'appliances',
}))

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <Root apiUrl="http://localhost">
        <App />
      </Root>,
      div
    )
  })
})
