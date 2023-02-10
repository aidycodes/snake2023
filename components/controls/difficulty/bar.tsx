import React, { Dispatch, useContext } from 'react'
import { SnakeContext } from '../../../context/snakecontext'

const Bar = ({level, index, handleOptions, barsHover, setBarsHover}:
    {level:number, index:number, handleOptions:(obj:{}) => void, barsHover:number,
     setBarsHover:Dispatch<React.SetStateAction<number>>}) => {

      const { start, paused } = useContext(SnakeContext)

  return (
    <>
    {start || paused ? 
      <div>
        <div     
    className={index <= level ? "h-12 w-3 m-1 rotate-12 bg-blue-300 rounded-md cursor-pointer mediapill" : 
    index <= barsHover ? "h-12 w-3 m-1 rotate-12 bg-blue-400 rounded-md cursor-pointer mediapill" : 
    "h-12 w-3 m-1 rotate-12 bg-blue-700 rounded-md cursor-pointer mediapill"}>
        <div className=""></div>
</div>
    </div>
:
    <div onMouseLeave={() => setBarsHover(0)} onMouseEnter={() => setBarsHover(index)}>
     
    <div 
    onClick={() => handleOptions({level:index})} 
    className={index <= level ? "h-12 w-3 m-1 rotate-12 bg-blue-300 rounded-md cursor-pointer mediapill" : 
    index <= barsHover ? "h-12 w-3 m-1 rotate-12 bg-blue-400 rounded-md cursor-pointer mediapill" : 
    "h-12 w-3 m-1 rotate-12 bg-blue-700 rounded-md cursor-pointer mediapill"}>
        <div className=""></div>
</div>
    </div>
     }
    </>
  )
}

export default Bar


