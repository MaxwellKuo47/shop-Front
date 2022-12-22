import React from 'react'
import { Link } from 'react-router-dom'

function ConsoleNavListItem({curAct, des, listNum, name, handleClick}) {

  //If not defined props.curAct means that the tag doesn't have any child need to show up
  return (
        <Link className={`px-10 ${curAct === listNum && (curAct !== undefined && listNum !== undefined ) ? "bg-slate-200 hover:bg-slate-200" : "hover:bg-slate-50"} select-none text-gray-500  cursor-pointer text-center p-3`} onClick={()=>handleClick(listNum)} to={des}>
          {name}
        </Link>
      
  )
}

export default ConsoleNavListItem