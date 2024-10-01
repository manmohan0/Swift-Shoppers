import 'tailwindcss/tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { Appbar } from './components/Appbar'
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {

  return (
      <>
        <BrowserRouter>
          <Appbar/>
          <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path='/' element={<Dashboard />}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
