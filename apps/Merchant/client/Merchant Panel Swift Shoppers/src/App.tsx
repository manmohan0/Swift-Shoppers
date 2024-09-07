
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { Appbar } from './components/Appbar'
function App() {

  return (
    <>
    <BrowserRouter>
      <Appbar/>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
