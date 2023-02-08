import React, { useContext, useState } from 'react'
import { SnakeContext } from '../../../context/snakecontext'
import Apple from './apple'

const NumberOfApples = () => {

    const {start, paused, handleNumberOfApples} = useContext(SnakeContext)

    const [selected, setSelected] = useState(0)
    const [hovered, setHovered] = useState(0)

    const handleSelected = (i:number) => {
        setSelected(i)
        handleNumberOfApples(i+1)
        
    }
    
    const handleHovered = (i:number) => {
        setHovered(i)
    }

    const array = Array(3).fill("")
    const apples = array.map((apple, i) => (
        <Apple key={i} selected={selected} index={i} 
        hovered={hovered} handleSelected={handleSelected}
        handleHovered={handleHovered}/>
    ))
    console.log(paused )
  return (
    <div className="z-0">
    <div className={!start && !paused ? "diffglass z-0" : "diffglass-disabled z-0"}>
        <h2 className="text-blue-900 text-xl pl-2 font-mono">No. Apples:</h2>
        <div className="flex">
          {apples}
        </div>
    </div>
    </div>
  )
}

export default NumberOfApples