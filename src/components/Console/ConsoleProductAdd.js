import React, { useRef } from 'react'
import ConsoleMainArea from './ConsoleMainArea'
import { PhotoIcon } from '@heroicons/react/24/outline'
import ToastAlert from '../ToastComponent/ToastAlert'
import ToastError from '../ToastComponent/ToastError'
import ToastSuccess from '../ToastComponent/ToastSuccess'

function ConsoleProductAdd() {
  const refPhoto = useRef(null)
  const handleImageInput = () => {
    console.log(refPhoto.current.files)
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
        <p>類別名稱</p>
        <input type="text" className='w-full p-2 placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400' />
      </div>
      {/* Product Description */}
      <div className='flex space-x-4 pt-4'>
        <p>商品敘述</p>
        <textarea cols="30" rows="10" className='p-2 flex-grow placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400 resize-none' ></textarea>
      </div>
    </ConsoleMainArea>
  )
}

export default ConsoleProductAdd