import React, { useEffect, useRef } from 'react'
import { ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import {render} from 'react-dom';

function ToastBox({type, message}) {
  const toastRef = useRef()
  useEffect(() => {
    const timer01 = setTimeout(() => {
      toastRef.current.classList.remove('animate-toastAppend')
      toastRef.current.classList.add('animate-toastRemove')
    },2500)
    const timer02 = setTimeout(() => {
      toastRef.current.classList.add('hidden')
      toastRef.current.parentElement.remove()
    },2700)
    return () => {
      clearTimeout(timer01)
      clearTimeout(timer02)
    }
  },[])
  const getImage = (select) => {
    switch(select) {
      case "error":
        return (<ExclamationCircleIcon className='h-8 text-red-500'/>)
      case "alert":
        return (<ExclamationTriangleIcon className='h-8 text-yellow-400'/>)
      case "info":
        return (<InformationCircleIcon className='h-8 text-blue-400'/>)
      case "success":
        return (<CheckCircleIcon className='h-8 text-green-500'/>)
    }
  }

  return (
    <div ref={toastRef} className='animate-toastAppend shadow-md rounded-lg p-5 min-w-[18vw] min-h-[10vh] bg-white opacity-95'>
      <div className='flex space-x-2 items-center font-bold text-gray-500'>
        {getImage(type)}
        <p>{message}</p>
      </div>
    </div>
  )
}

function getContainer() {
  let toastRoot;
  let toastContainer;

  if (document.getElementById('toast-root')) {
    toastRoot = document.getElementById('toast-root');
  } else {
    const divDOM = document.createElement('div');
    divDOM.id = 'toast-root';
    document.body.appendChild(divDOM);
    toastRoot = divDOM;
  }
  if (toastRoot.firstChild) {
    toastContainer = toastRoot.firstChild;
  } else {
    const divDOM = document.createElement('div');
    toastRoot.appendChild(divDOM);
    toastContainer = divDOM;
  }
  const divDOM = document.createElement('div');
  toastContainer.appendChild(divDOM);

  toastRoot.classList.add('absolute', 'top-0', 'w-full')
  toastContainer.classList.add('absolute', 'top-5', 'flex', 'flex-col', 'items-center', 'right-10', 'space-y-2', 'px-3', 'pb-5', 'overflow-hidden', 'max-h-[88vh]')
  return divDOM;
}
const toastMessage = {
  success: (msg) => {
    render(<ToastBox message={msg} type="success" />, getContainer());
  },
  info: (msg) => {
    render(<ToastBox message={msg} type="info" />, getContainer());
  },
  warn: (msg) => {
    render(<ToastBox message={msg} type="warn" />, getContainer());
  },
  error: (msg) => {
    render(<ToastBox message={msg} type="error" />, getContainer());
  },
};

export {ToastBox, toastMessage}