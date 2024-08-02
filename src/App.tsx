import './App.css'

import useRoutesElement from './routes/useRoutesElement'

function App() {
  const routes = useRoutesElement()

  return <>{routes}</>
}

export default App
