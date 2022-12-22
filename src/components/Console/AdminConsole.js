import React from 'react'
import { Outlet } from 'react-router-dom'
import ConsoleMainBlock from './ConsoleMain'
import ConsoleNav from './ConsoleNav'

function AdminConsole() {
  return (
    <div className='mt-6 max-w-6xl mx-auto flex'>
      {/* Console NavBar */}
      <ConsoleNav />
      {/* Console Block */}
      <Outlet />
    </div>
  )
}

export default AdminConsole