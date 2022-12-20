import React from 'react'

function ConsoleNavListItemChild({name}) {
  return (
    <li className='select-none animate-append text-gray-500 bg-slate-100 hover:bg-slate-200 text-center p-2 cursor-pointer'>
      {name}
    </li>
  )
}

export default ConsoleNavListItemChild