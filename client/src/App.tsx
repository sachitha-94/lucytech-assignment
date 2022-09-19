import React, { FC } from 'react'

import Home from 'features/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App: FC = () => {
  return (
    <BrowserRouter>
      <div data-testid="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
