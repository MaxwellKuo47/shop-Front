import React from 'react'
import { Link } from 'react-router-dom'

function ConsoleNavListItemChild({name, des}) {
  return (
    <Link to={des} className='select-none animate-append text-gray-500 bg-slate-100 hover:bg-slate-200 text-center p-2 cursor-pointer'>
      {name}
    </Link>
  )
}

export default ConsoleNavListItemChild