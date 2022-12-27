import React from 'react'

function ConsoleProductAddImagePreview({src, position, handleDelete}) {
  return (
    <div className='h-28 w-28 border-4 border-slate-300 grid place-content-center cursor-pointer hover:border-amber-600' onClick={()=> handleDelete(position)}>
      <img src={src} alt="clothes" className='h-24 w-24 object-cover' />
    </div>
  )
}

export default ConsoleProductAddImagePreview