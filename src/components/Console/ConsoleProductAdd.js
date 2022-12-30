import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import ConsoleMainArea from './ConsoleMainArea'
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
import ConsoleProductAddTagBox from './ConsoleProductAddTagBox'
import ConsoleProductAddAmount from './ConsoleProductAddAmount';
import ConsoleProductAddImagePreview from './ConsoleProductAddImagePreview';
import axios from 'axios';
import { toastMessage } from '../ToastNotify'

function ConsoleProductAdd() {
  const invalidClsList = ['outline-dashed','outline-2','outline-red-400'];
  const refPhoto = useRef();
  const [curPhotos, setCurPhotos] = useState([]);
  const refTagInput = useRef();
  const [Tag, setTag] = useState([]);
  const [ColorSizeElements, SetColorSizeElement] = useState([]);
  const dataSubmit = {
    productName: useRef(),
    productDes: useRef(),
    mktPrice: useRef(),
    salPrice: useRef(),
  };

  const handleImageInput = async () => {
    const compressImage = (image, quality, size) => {
      //Compress image to big one for product detail page, small one for display page.
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const ratio = Math.max(image.width, image.height) / size;
        canvas.width = image.width / ratio;
        canvas.height = image.height / ratio;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
        canvas.toBlob(resolve,
        "image/jpeg",
        quality
        )
      })
    }
    const newArr = curPhotos.slice(0)
    const curOffset = newArr.length
    if (!(curOffset < 12)) { //Max Photo for a product is 12
      // Show error message that can't upload more image
      return
    }
    let counter = 0;
    for (const file of refPhoto.current.files) {
      if((counter + curOffset) === 12) return;
      counter++;
      const frd = new FileReader();
      frd.readAsDataURL(file)
      const frdDoneEvent = await new Promise((resolve) => frd.onload = resolve)
      const image = new Image();
      image.src = frdDoneEvent.target.result;
      await new Promise((resolve) => image.onload = resolve);

      const quality = 0.8;
      const blobLgImg = await compressImage(image, quality, 1200)
      const blobSmImg = await compressImage(image, quality, 600)
      const smImgSrc = URL.createObjectURL(blobSmImg)
      newArr.push({
        ID: uuid(),
        smImgSrc,
        blobLgImg,
        blobSmImg,
      })
      if(counter === refPhoto.current.files.length || 
        (counter + curOffset) === 12) {
        setCurPhotos(newArr);
        return;
      }
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
  
  const handleSubmit = async () => {
    let invalid = false;
    const prodNameEl = dataSubmit.productName.current;
    if (prodNameEl.value.length < 5 ) {
      toastMessage.error("商品名稱不可小於5個字")
      invalid = true;
    }
  
    const prodDesEl = dataSubmit.productDes.current;
    if (prodDesEl.value.length > 1000 ) {
      prodDesEl.classList.add(...invalidClsList);
      toastMessage.error("商品描述不可以多於1000個字")
      invalid = true;
    }
  
    const prodMktPrice = dataSubmit.mktPrice.current;
    if ( isNaN(prodMktPrice.value) || Number(prodMktPrice.value) > 9999 ||  Number(prodMktPrice.value) < 200) {
      //價格不合理
      toastMessage.error("商品市價不合理")
      invalid = true;
    }

    const prodSalPrice = dataSubmit.salPrice.current;
    if ( isNaN(prodSalPrice.value) || prodSalPrice.value > 5000 ||  prodSalPrice.value < 200) {
      //價格不合理
      toastMessage.error("商品售價不合理")
      invalid = true;
    }

    if (curPhotos.length < 1) {
      toastMessage.error("相片不可小於1張")
      invalid = true
    }

    const CSElementsLength = ColorSizeElements.length
    if (CSElementsLength < 1 ) {
      toastMessage.error("請輸入商品數量")
      invalid = true
    }
    const colors = new Set([]);
    ColorSizeElements.forEach(el => {
      colors.add(el.color)
      el.S = Number(el.S);
      el.M = Number(el.M);
      el.L = Number(el.L);
      el.XL = Number(el.XL);
      el.OS = Number(el.OS);
      const amount = el.S + el.M + el.L + el.XL + el.OS;
      if (amount < 1 ) {
        toastMessage.error("商品數量小於1")
        invalid = true
      }
    });
    if (colors.size !== CSElementsLength) {
      toastMessage.error("商品數量顏色重複")
      invalid = true; //Check color duplicate
    }
    // if (invalid) return;
    
    //If it's valid
    try {
      const formData = new FormData();
      const fileIDs = [];
      curPhotos.forEach((obj, index) => {
        formData.append(`fileLg${index}`,obj.blobLgImg);
        formData.append(`fileSm${index}`,obj.blobSmImg);
        fileIDs.push(obj.ID)
      })
      formData.append("fileIDs", fileIDs);
      const info = {
        productName : prodNameEl.value,
        productDes : prodDesEl.value,
        productMktPrice : Number(prodMktPrice.value),
        productSalPrice : Number(prodSalPrice.value),
        productAmount : ColorSizeElements,
        productTags : Tag,
      }
      const jsonInfoStr = JSON.stringify(info);
      console.log(jsonInfoStr);
      formData.append('info', jsonInfoStr);
      await axios.post('http://localhost:8081/api/product', formData)
      toastMessage.success("新增商品成功")
    } catch (e) {
      console.log(e)
      toastMessage.error(e.message)
      toastMessage.error("新增商品失敗")
    }
  }
  return (
    <ConsoleMainArea>
      {/* Product Image */}
      <div className='flex items-center space-x-4 mt-2'>
        <p>商品圖片</p>
        <div className='grid grid-cols-5 gap-3 place-items-center'>
          {/* Preview */}
          {curPhotos.length > 0 && curPhotos.map((obj, index) => (<ConsoleProductAddImagePreview key={obj.ID} src={obj.smImgSrc} position={index} handleDelete={handleDeleteImage} />))}
          
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
      {/* Price */}
      <div className='flex items-center space-x-4'>
        <p>商品市價</p>
        <input type="text" ref={dataSubmit.mktPrice} className='w-full p-2 placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400' minLength={3} maxLength={4} />
        <p>商品售價</p>
        <input type="text" ref={dataSubmit.salPrice} className='w-full p-2 placeholder:select-none rounded-lg pl-4 bg-transparent focus:outline-none border border-slate-400' minLength={3} maxLength={4} />
      </div>
      {/* Stock*/}
      <div className='flex items-center space-x-4'>
        <p>商品數量</p>
        <div className='grid grid-cols-4 gap-2 place-items-center'>
          {ColorSizeElements.length > 0 && ColorSizeElements.map((obj, index) => (
            <ConsoleProductAddAmount key={obj.id} position={index} values={obj} handleChange={handleBoxValChange} handleClose={closeColorSizeElement} />
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
        <button onClick={handleSubmit} className='transition duration-150 outline outline-emerald-400 outline-offset-2 w-28 h-11 bg-green-500 border border-green-300 active:bg-green-700  active:border-green-500 text-slate-50 font-bold text-base rounded-lg shadow-md'>新增商品</button>
      </div>

    </ConsoleMainArea>
  )
}

export default ConsoleProductAdd