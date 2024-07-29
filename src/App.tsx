import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { useAppSelector } from './redux/hooks'
import useRoutesElement from './routes/useRoutesElement'

function App() {

  const routes = useRoutesElement();

  return <>{routes}</>
}

export default App
