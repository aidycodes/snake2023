import React, { useContext } from 'react'
import { SnakeContext } from '../../context/snakecontext'

const Bonus = () => {
    const {bonus} = useContext(SnakeContext)

    const width = +bonus.timeOut * 20

  return (
    <>
    {typeof bonus.timeOut === 'number'  ?
    <div className="border-2 diffglass p-2 glass bonus">
        <div className="flex justify-between">
    <h2 className=" text-xl  text-blue-900 bonus-font">Bonus!</h2>
    <div className="w-fit bonus-number font-bold text-red-500 animate-ping rounded-full font-mono shadow-lg">{bonus.timeOut}</div>
    </div>
    <div className="timeline" style={{width:width}}></div>
    
    </div>
    :null}
    </>
  )
}

export default Bonus