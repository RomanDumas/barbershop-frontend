import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminPanel from './pages/AdminPanel.jsx'
import CreateClient from './pages/CreateClient.jsx'
import UpdateClient from './pages/UpdateClient.jsx'
import CreateVisit from './pages/CreateVisit.jsx'
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <nav className='header'>
        <Link className='link' to="/admin">Admin</Link>
        <Link className='link' to="/createClient">create client</Link>
        <Link className="link" to="/createVisit">Create Visit</Link>
      </nav>

      <Routes>
        <Route path="/createVisit" element={<CreateVisit />} />
        <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/createClient" element={<CreateClient />} />
        <Route path="/updateClient" element={<UpdateClient />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)


