import React from 'react'

import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from 'app/store'
import { Provider } from 'react-redux'

import NavbarComponent from '.'

afterEach(() => {
  cleanup()
})

describe('Navbar Component', () => {
  // Check Navbar Component Rendering
  it('Navbar Component Rendering', () => {
    render(
      <Provider store={store}>
        <NavbarComponent />
      </Provider>
    )
    const navbar = screen.getByTestId('navbar')
    expect(navbar).toBeInTheDocument()
  })
})
