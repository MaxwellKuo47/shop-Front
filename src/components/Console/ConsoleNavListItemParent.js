import React from 'react'

function ConsoleNavListItemParent(props) {
  return (
    <div className='flex flex-col animate-append'>
      {props.children}
    </div>
  )
}

export default ConsoleNavListItemParent