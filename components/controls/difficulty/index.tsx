import React, { useContext, useState } from 'react'
import { SnakeContext } from '../../../context/snakecontext'
import Bar from './bar'

const Difficulty = ({level, handleOptions}: {level:number, handleOptions:(obj:{}) => void}) => {

  const { start, paused } = useContext(SnakeContext)

const quickArray = Array.from(Array(9).keys())

const [barsHover, setBarsHover] = useState<number>(0)

const bars = quickArray.map((item, i) => (<Bar barsHover={barsHover} setBarsHover={setBarsHover} key={item} level={level} index={item} handleOptions={handleOptions}/>))


  return (
    <div className={start || paused ? "diffglass-disabled rounded-md " : "diffglass rounded-md shadow-md"} >
        <h2 className="font-mono text-xl px-1 mx-2 text-blue-900">Difficulty:</h2>
        <div className="flex mx-8">
            {bars}
        </div>
    </div>
  )
}

export default Difficulty