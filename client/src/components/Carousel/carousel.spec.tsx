import React from 'react'

import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from 'app/store'
import { Provider } from 'react-redux'

import CarouselComponent from '.'

afterEach(() => {
  cleanup()
})

describe('Carousel Component', () => {
  // Check Carousel component rendering
  it('Check Carousel component rendering', () => {
    render(
      <Provider store={store}>
        <CarouselComponent />
      </Provider>
    )
    const carousel = screen.getByTestId('carousel')
    expect(carousel).toBeInTheDocument()
  })
})
