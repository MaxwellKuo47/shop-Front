import React, { useState } from 'react'
import ConsoleNavListItem from './ConsoleNavListItem'
import ConsoleNavListItemChild from './ConsoleNavListItemChild'

function ConsoleNav() {
  const [curTag, SetCurTag] = useState(null)
  return (
    <div className='font-mono'>
      <ul className='flex flex-col'>

        <ConsoleNavListItem name={"商品管理"} handleClick={SetCurTag} listNum={1} curAct={curTag} />
        {curTag === 1 && (
              <ul>
                <ConsoleNavListItemChild name={"新增商品"} />
                <ConsoleNavListItemChild name={"商品查詢"} />
                <ConsoleNavListItemChild name={"二手商品管理"} />
              </ul>
        )}

        <ConsoleNavListItem name={"會員管理"} handleClick={SetCurTag} listNum={2} curAct={curTag}/>
        {curTag === 2 && (
            <ul>
              <ConsoleNavListItemChild name={"會員查詢"} />
            </ul>
        )}
        <ConsoleNavListItem name={"首頁管理"} handleClick={SetCurTag} listNum={3} curAct={curTag}/>
        <ConsoleNavListItem name={"優惠券"} handleClick={SetCurTag} listNum={4} curAct={curTag}/>
        <ConsoleNavListItem name={"報表"} handleClick={SetCurTag} listNum={5} curAct={curTag}/>
      </ul>
    </div>
  )
}

export default ConsoleNav