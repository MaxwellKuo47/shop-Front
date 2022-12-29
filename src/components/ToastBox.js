import React from 'react'

function ToastBox(props) {
  return (
    <div className='absolute top-10 right-20 w-64'>
      {props.children}
    </div>
  )
}

export default ToastBox