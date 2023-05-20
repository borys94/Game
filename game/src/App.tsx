import React from 'react'
import './App.css'
import GameCmp from './components/Game'
import EditorComponent from './components/Editor/Editor'

import { createHashRouter, RouterProvider } from 'react-router-dom'
import Sprites from './components/Sprites'

const router = createHashRouter([
  {
    path: '/',
    element: <GameCmp />
  },
  {
    path: '/editor',
    element: <EditorComponent />
  },
  {
    path: '/sprites',
    element: <Sprites />
  }
])

function App(): React.ReactElement {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
