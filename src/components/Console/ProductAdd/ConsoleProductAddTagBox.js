import React from 'react'
function ConsoleProductAddTagBox({word, handleOnClick}) {
  return (
    <p className='bg-amber-900 hover:bg-amber-700 rounded-md px-2 py-1 ml-2 mt-2 text-white font-mono tracking-wider cursor-pointer' onClick={handleOnClick}>#{word}</p>
  )
}

export default ConsoleProductAddTagBox 