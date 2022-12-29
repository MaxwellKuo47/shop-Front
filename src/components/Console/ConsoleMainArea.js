import React from 'react'

function ConsoleMainArea(props) {
  return (
    <div ref={props.refference} className='whitespace-nowrap flex-grow flex flex-col space-y-5 bg-slate-50 pl-36 pr-20 pt-10 mx-5 text-gray-500 text-sm rounded-xl shadow-md pb-16'>
      {props.children}
    </div>
  )
}

export default ConsoleMainArea