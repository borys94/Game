import React from 'react'
import './App.css'
import GameCmp from './components/Game/Game'
import EditorComponent from './components/Editor/Editor'

import { createHashRouter, RouterProvider } from 'react-router-dom'
import Ui from './components/Ui'

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
    path: '/ui',
    element: <Ui />
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
