import React from 'react'

import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from 'app/store'
import { Provider } from 'react-redux'

import App from './App'

afterEach(() => {
  cleanup()
})

describe('App', () => {
  // Check App rendering
  it('Check App rendering', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const app = screen.getByTestId('app')
    expect(app).toBeInTheDocument()
  })
})
