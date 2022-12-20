import React from 'react'

function LinkIcon({Icon, Title}) {
  return (
    <div className='flex space-x-1 items-center cursor-pointer text-[#8b8b8b] hover:text-[#d8abbf]'>
      <Icon className="h-4 "/>
      <p className='select-none font-light text-xs tracking-wide'>{Title}</p>
    </div>
  )
}

export default LinkIcon