import React, { useRef, useState } from 'react'
import ConsoleMainArea from './ConsoleMainArea'
import { PhotoIcon } from '@heroicons/react/24/outline'
import ConsoleProductAddTagBox from './ConsoleProductAddTagBox'

function ConsoleProductAdd() {
  const refPhoto = useRef(null);
  const refTagInput = useRef(null)
  const [Tag, setTag] = useState([]);

  const handleImageInput = () => {
    console.log(refPhoto.current.files)
  }
  const handleTagOnClick = (number) => {
    const endOfList = Tag.length - 1
    let newArr;
    switch (Number(number)) {
    case 0:
      newArr = Tag.slice(1);
      break;
    case endOfList:
      newArr = Tag.slice(0,-1);
      break;
    default:
      newArr = [...Tag.slice(0, number),...Tag.slice(number+1)]
    }
    setTag(newArr)
  } 
  const handleTagBoxChange = () => {
    const curCheck = refTagInput.current.textContent.slice(-1).charCodeAt(0)
    
    if (curCheck === 160 || curCheck === 32) {
      const content = refTagInput.current.textContent.slice(0,-1);

      if (!content) return

      setTag([...Tag, content])
      refTagInput.current.textContent = null
    }
  }

  return (
    <ConsoleMainArea>
      {/* Product Image */}
      <div className='flex items-center space-x-4 mt-2'>
        <p>商品圖片</p>
        <div className='group hover:bg-slate-200 h-20 w-20 border border-dashed cursor-pointer grid place-content-center border-slate-400' onClick={()=>refPhoto.current.click()} >
          <PhotoIcon className='h-8 text-slate-500 group-hover:text-blue-500' />
        </div>
        <input hidden type="file" ref={refPhoto} accept='image/*' multiple onChange={()=>handleImageInput()}/>
      </div>
      {/* Product Name */}
      <div className='flex items-center space-x-4'>
        <p>商品名稱</p>
        <input type="text" className='w-full p-2 placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400'  />
      </div>
      {/* Product Hash Tag */}
      <div className='flex items-center space-x-4'>
        <p>標籤種類</p>
        <div contentEditable id="text" ref={refTagInput} onInput={handleTagBoxChange} className='flex space-x-2 aitems-center w-full p-2 min-h-10 h-auto placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400'>
        </div>
      </div>
    <div className='flex space-x-2 items-center flex-wrap max-w-2xl'>{Tag.map( (word, index) => (<ConsoleProductAddTagBox key={index} word={word} handleOnClick={()=>handleTagOnClick(index)} />))}</div>
      {/* Product Description */}
      <div className='flex space-x-4 pt-4'>
        <p>商品敘述</p>
        <textarea cols="30" rows="10" className='p-2 flex-grow placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400 resize-none' ></textarea>
      </div>
    </ConsoleMainArea>
  )
}

export default ConsoleProductAdd