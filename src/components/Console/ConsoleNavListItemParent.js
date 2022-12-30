import React from 'react'

function ConsoleNavListItemParent(props) {
  return (
    <div className='flex flex-col animate-grow'>
      {props.children}
    </div>
  )
}

export default ConsoleNavListItemParent