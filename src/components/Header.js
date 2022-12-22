import React from 'react'
import LinkIcon from './LinkIcon'
import {
  UserCircleIcon,
  GiftIcon,
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid"
import NavSelection from './NavSelection'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='max-w-full bg-white'>
      <div className='pt-4 max-w-6xl mx-auto bg-transparent'>
        {/* Header */}
        <div className='flex justify-between pb-6 border-b-2 border-gray-300'>
          <Link to="/" className='text-center cursor-pointer select-none space-y-1'>
            <h1 className='tracking-wider text-5xl font-serif '>JetL</h1>
            <h2 className='font-serif tracking-wide'>Since 2021</h2>
          </Link>
          <div>
            <div className='flex space-x-4 items-center justify-end'>
              <Link className='select-none text-sm text-[#2a2a2a] font-mono' to={`/console`} >CONSOLE</Link>
              <a className='select-none text-sm text-[#2a2a2a] font-mono' href="https://www.facebook.com/JetLstudio/" target="_blank">FACEBOOK</a>
              <a className='select-none text-sm text-[#2a2a2a] font-mono' href="https://www.instagram.com/jetl__2021/" target="_blank">INSTAGRAM</a>
              <a className='select-none text-xs text-[#2a2a2a] font-sans' href="https://shopee.tw/jetl__2021" target="_blank">蝦皮賣場</a>
            </div>
            <div className='flex space-x-5 justify-end mt-9'>
              <LinkIcon Icon={UserCircleIcon} Title="LOGIN" />
              <LinkIcon Icon={GiftIcon} Title="MYPAGE" />
              <LinkIcon Icon={HeartIcon} Title="WISHLIST"/>
              <LinkIcon Icon={ShoppingCartIcon} Title="CART(0)" />
            </div>
          </div>
        </div>
        {/* Navigation Bar */}
        <div className='items-center flex justify-between mt-3 text-sm text-[#8b8b8b]'>
          <NavSelection ch="新品" en="NEW" />
          <NavSelection ch="現貨" en="IN STOCK" />
          <NavSelection ch="上身" en="TOP" > 
            <ul className='nav-selection-list'>
              <li className='nav-selection-list-item'><button>上衣</button></li>
              <li className='nav-selection-list-item'><button>襯衫</button></li>
            </ul>
          </NavSelection> 
          <NavSelection ch="下身" en="BOTTOM">
            <ul className='nav-selection-list'>
              <li className='nav-selection-list-item'><button>裙裝</button></li>
              <li className='nav-selection-list-item'><button>長褲</button></li>
              <li className='nav-selection-list-item'><button>短褲</button></li>
            </ul>
          </NavSelection>
          <NavSelection ch="一件式" en="ONE PIECE" />
          <NavSelection ch="洋裝" en="DRESS" />
          <NavSelection ch="外套" en="COAT" />
          <NavSelection ch="套裝" en="SUIT" />
          <NavSelection ch="背心" en="BANDEDU" />
          <NavSelection ch="配件" en="ACCESSORY"> 
            <ul className='nav-selection-list'>
              <li className='nav-selection-list-item'><button>包包</button></li>
              <li className='nav-selection-list-item'><button>手鍊／手環</button></li>
              <li className='nav-selection-list-item'><button>耳環</button></li>
            </ul>
          </NavSelection>
          {/* Searching bar */}
          <form className='flex items-center bg-gray-100 rounded-full h-8 border border-gray-300 mx-4'>
            <input type="text" className='placeholder:select-none pl-4 bg-transparent focus:outline-none' placeholder='輸入關鍵字' />
            <button type='submit'><MagnifyingGlassIcon className='pr-4 h-4 text-gray-400'/></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Header