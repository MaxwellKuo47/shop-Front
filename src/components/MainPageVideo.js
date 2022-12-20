import React from 'react'

function MainPageVideo({videoSrc, show}) {

  return (
    <div className={`${show? "flex" : "hidden" } relative items-center justify-center h-screen mb-12 mt-6 overflow-hidden -z-20`}>
      <div className="absolute -z-40 w-auto min-w-full min-h-full max-w-none bg-black opacity-50"></div>
      <video className="absolute -z-50 w-auto min-w-full min-h-full max-w-none" src={videoSrc} autoPlay muted loop></video>
      <div className="select-none flex flex-col items-center -z-30 font-serif text-slate-300 opacity-40 mb-64">
        <div className="text-8xl">JetL</div>
        <div className="text-8xl">Since 2021</div>
      </div>
    </div>
  )
}

export default MainPageVideo