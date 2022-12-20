import React from 'react'

function ConsoleNavListItem(props) {
  let act = props.listNum
  if (props.curAct) {
    act = 0
  }
  return (
      <li className={`${props.curAct === props.listNum ?"bg-slate-200 hover:bg-slate-200" : "hover:bg-slate-50"} select-none text-gray-500  cursor-pointer text-center p-3`} onClick={()=>props.handleClick(act)}>
        {props.name}
      </li>
      
  )
}

export default ConsoleNavListItem