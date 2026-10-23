import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminPanel from './pages/AdminPanel.jsx'
import CreateClient from './pages/CreateClient.jsx'
import UpdateClient from './pages/UpdateClient.jsx'
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>


      <nav className='header'>
        <Link className='link' to="/admin">Admin</Link>
        <Link className='link' to="/createClient">create client</Link>

      </nav>
    



      <Routes>
        <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/createClient" element={<CreateClient />} />
        <Route path="/updateClient" element={<UpdateClient />} />
      </Routes>



    </BrowserRouter>
  </StrictMode>,
)


