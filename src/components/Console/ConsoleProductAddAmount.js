import {XMarkIcon} from "@heroicons/react/24/solid"

function ConsoleProductAddAmount({ values, handleChange, handleClose, position }) {
  const handleCloseButton = () => {
    handleClose(position)
  }
  return (
    <div className='flex relative flex-col space-y-2 border-2 border-slate-500 p-1 rounded-md'>
      <div className='absolute grid place-items-center -top-2 -right-2 z-10 bg-slate-200 rounded-full w-5 h-5 group hover:bg-slate-400 cursor-pointer' onClick={handleCloseButton}><XMarkIcon className='w-3 text-slate-600 group-hover:text-white' /></div>
      <div className='flex items-center space-x-3 w-28'>
        <input  className='w-10 h-6' type="color" onChange={(e) => handleChange(e, position,"color")} value={values.color}/>
        <p className='font-semibold select-none'>{values.color}</p>
      </div>
      <div className='flex justify-between'>
        <p>OS  </p>
        <input type="number" className='w-14 rounded-md bg-transparent border-2 border-slate-500 px-1' onChange={(e) => handleChange(e, position, "OS")} min="0" max="999" value={values.OS}/>
      </div>
      <div className='flex justify-between'>
        <p>S   </p>
        <input type="number" className='w-14 rounded-md bg-transparent border-2 border-slate-500 px-1' onChange={(e) => handleChange(e, position, "S")} min="0" max="999" value={values.S}/>
      </div>
      <div className='flex justify-between'>
        <p>M   </p>
        <input type="number" className='w-14 rounded-md bg-transparent border-2 border-slate-500 px-1' onChange={(e) => handleChange(e, position, "M")} min="0" max="999" value={values.M}/>
      </div>
      <div className='flex justify-between'>
        <p>L   </p>
        <input type="number" className='w-14 rounded-md bg-transparent border-2 border-slate-500 px-1' onChange={(e) => handleChange(e, position, "L")} min="0" max="999" value={values.L}/>
      </div>
      <div className='flex justify-between'>
        <p>XL   </p>
        <input type="number" className='w-14 rounded-md bg-transparent border-2 border-slate-500 px-1' onChange={(e) => handleChange(e, position, "XL")} min="0" max="999" value={values.XL}/>
      </div>
  </div>
  )
}
export default ConsoleProductAddAmount