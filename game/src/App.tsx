/* eslint-disable */
import React, { useEffect } from 'react'
import './App.css'
import GameCmp from './components/Game'
import EditorComponent from './components/Editor'
import 'normalize.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GameCmp />,
  }, {
    path: "/editor",
    element: <EditorComponent />,
  },
]);


function App (): JSX.Element {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <EditorComponent />
//     </div>
//   );
// }

export default App
/* eslint-enable */
