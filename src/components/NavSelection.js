import React from 'react'

function NavSelection(props) {
  return (
    <div className='select-none items-center group relative cursor-pointer flex justify-center place-items-center w-20  h-10'>
          <span className='group-hover:opacity-0 absolute transition duration-200 opacity-100 whitespace-nowrap font-light'>{props.en}</span>
          <span className='group-hover:opacity-100 absolute transition duration-200 opacity-0 whitespace-nowrap font-mono'>{props.ch}</span>
          {props.children}
    </div>
  )
}

export default NavSelection