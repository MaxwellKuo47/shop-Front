import React, { useEffect, useState } from 'react'
import ConsoleNavListItem from './ConsoleNavListItem'
import ConsoleNavListItemChild from './ConsoleNavListItemChild'
import ConsoleNavListItemParent from './ConsoleNavListItemParent'
function ConsoleNav() {
  const [curTag, SetCurTag] = useState(null)
  const handleClickAct = (listNum) => {
    if (curTag === listNum) {
      SetCurTag(0) 
    } else {
      SetCurTag(listNum)
    }
  }
  return (
    <div className='font-mono'>
      <div className='flex flex-col '>
        <ConsoleNavListItem name={"後台首頁"} des={"/console"} />
        <ConsoleNavListItem name={"商品管理"} handleClick={handleClickAct} listNum={2} curAct={curTag} />
        {curTag === 2 && (
              <ConsoleNavListItemParent>
                <ConsoleNavListItemChild name={"新增商品"} des={"/console/product/add"}/>
                <ConsoleNavListItemChild name={"商品查詢"} />
              </ConsoleNavListItemParent>
        )}

        <ConsoleNavListItem name={"會員管理"} handleClick={handleClickAct} listNum={3} curAct={curTag}/>
        {curTag === 3 && (
            <ConsoleNavListItemParent>
              <ConsoleNavListItemChild name={"會員查詢"} />
            </ConsoleNavListItemParent>
        )}
        <ConsoleNavListItem name={"首頁管理"} handleClick={handleClickAct} listNum={4} curAct={curTag}/>
        <ConsoleNavListItem name={"優惠券"} handleClick={handleClickAct} listNum={5} curAct={curTag}/>
        <ConsoleNavListItem name={"報表"} handleClick={handleClickAct} listNum={6} curAct={curTag}/>
      </div>
    </div>
  )
}

export default ConsoleNav