import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import ConsoleMainArea from './ConsoleMainArea'
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
import ConsoleProductAddTagBox from './ConsoleProductAddTagBox'
import ConsoleProductAddAmount from './ConsoleProductAddAmount';
import ConsoleProductAddImagePreview from './ConsoleProductAddImagePreview';

function ConsoleProductAdd() {
  const refPhoto = useRef(null);
  const [curPhotos, setCurPhotos] = useState([]);
  const refTagInput = useRef(null);
  const [Tag, setTag] = useState([]);
  const [ColorSizeElements, SetColorSizeElement] = useState([]);
  const dataSubmit = {
    productName: useRef(null),
    productDes: useRef(null),
  };

  const handleImageInput = () => {
    const newArr = curPhotos.slice(0)
    const curOffset = newArr.length
    if (!(curOffset < 12)) { //Max Photo for a product is 12
      // Show error message that can't upload more image
      return
    }
    let counter = 0;
    for (const file of refPhoto.current.files) {
      const frd = new FileReader();
      frd.onload = e => {
        if((counter + curOffset) === 12) return;
        counter++;
        newArr.push({
          ID: uuid(),
          imageSrc: e.target.result,
          fileObj: file,
        })
        if(counter === refPhoto.current.files.length || 
          (counter + curOffset) === 12) {
          setCurPhotos(newArr);
        }
      }
      frd.readAsDataURL(file)
    }
  }
  const handleDeleteImage = (position) => {
    const newArr = curPhotos.slice(0)
    newArr.splice(position, 1)
    setCurPhotos(newArr)
  }
  const handleTagOnClick = (position) => {
    const newArr = Tag.slice(0)
    newArr.splice(position, 1)
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
  const closeColorSizeElement = (position) => {
    const newArr = ColorSizeElements.slice(0)
    newArr.splice(position, 1);
    SetColorSizeElement([...newArr]);
  }
  const handleAddColorSizeBox = () => {
    const newArr = ColorSizeElements.slice(0);
    newArr.push({
      id: uuid(),
      color: "#000000",
      OS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    });
    SetColorSizeElement(newArr);
  }
  const handleBoxValChange = (e, position, propName) => {
    const newArr = ColorSizeElements.slice(0);
    newArr[position][propName] = e.target.value;
    SetColorSizeElement(newArr);
  }
  const handleSubmit = () => {
    console.log("商品名稱", dataSubmit.productName.current.value)
    console.log("商品敘述", dataSubmit.productDes.current.value)
    console.log("表單圖片", curPhotos.map((obj) => obj.fileObj))
    console.log("表單標籤", Tag)
    console.log("表單輸出數量", ColorSizeElements)
  }
  return (
    <ConsoleMainArea>

      {/* Product Image */}
      <div className='flex items-center space-x-4 mt-2'>
        <p>商品圖片</p>
        <div className='grid grid-cols-5 gap-3 place-items-center'>
          {/* Preview */}
          {curPhotos.length > 0 && curPhotos.map((obj, index) => (<ConsoleProductAddImagePreview key={obj.ID} src={obj.imageSrc} position={index} handleDelete={handleDeleteImage} />))}
          
          {/* ImageAdding Button */}
          <div className='group hover:bg-slate-200 hover:border-blue-500 h-20 w-20 border-2 border-dashed cursor-pointer grid place-items-center border-slate-400' onClick={()=> curPhotos.length < 12 && refPhoto.current.click()} >
            <PhotoIcon className='h-8 text-slate-500 group-hover:text-blue-500' />
            <p className='font-semibold group-hover:text-blue-500'>{`(${curPhotos.length}/12)`}</p>
            {curPhotos.length == 12 && (<p className='font-semibold group-hover:text-amber-600'>已達上限</p>)}
          </div>
        </div>
        <input hidden type="file" ref={refPhoto} accept='image/*' multiple onClick={(e) => e.target.value = null} onChange={()=>handleImageInput()}/>
      </div>

      {/* Product Name */}
      <div className='flex items-center space-x-4'>
        <p>商品名稱</p>
        <input type="text" ref={dataSubmit.productName} className='w-full p-2 placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400'  />
      </div>

      {/* Stock*/}
      <div className='flex items-center space-x-4'>
        <p>商品數量</p>
        <div className='grid grid-cols-4 gap-2 place-items-center'>
          {ColorSizeElements.length > 0 && ColorSizeElements.map((props, index) => (
            <ConsoleProductAddAmount key={props.id} position={index} values={props} handleChange={handleBoxValChange} handleClose={closeColorSizeElement} />
          ))}
          <button onClick={handleAddColorSizeBox} className='h-10 w-10 border-2 border-slate-400 border-dashed grid place-items-center group hover:border-blue-500 hover:bg-slate-200'>
            <PlusIcon className='group-hover:text-blue-500 h-5 text-slate-400' />
          </button>
        </div>
      </div>

      {/* Product Hash Tag */}
      <div className='flex items-center space-x-4'>
        <p>標籤種類</p>
        <div contentEditable id="text" ref={refTagInput} onInput={handleTagBoxChange} className='flex space-x-2 aitems-center w-full p-2 min-h-10 h-auto placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400'>
        </div>
      </div>
        {/* Show Current Tag */}
      <div className='flex space-x-2 items-center flex-wrap max-w-2xl'>{Tag.map( (word, index) => (<ConsoleProductAddTagBox key={index} word={word} handleOnClick={()=>handleTagOnClick(index)} />))}</div>

      {/* Product Description */}
      <div className='flex space-x-4 pt-4'>
        <p>商品敘述</p>
        <textarea ref={dataSubmit.productDes} cols="30" rows="10" className='p-2 flex-grow placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400 resize-none' ></textarea>
      </div>

      {/* Submit Button */}
      <div className='grid place-items-center pt-1'>
        <button onClick={handleSubmit} className='w-28 h-11 bg-green-500 border border-green-700 active:bg-green-700  active:border-green-900 text-slate-50 font-sans text-base rounded-lg'>新增商品</button>
      </div>

    </ConsoleMainArea>
  )
}

export default ConsoleProductAdd