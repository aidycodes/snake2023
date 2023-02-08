import React, { useContext } from 'react'
import { SnakeContext } from '../../../context/snakecontext'

const Apple = ({selected, hovered, index, handleHovered, handleSelected}:
    {selected:number, hovered: number, index: number, handleHovered:(i:number) => void, handleSelected:(i:number) => void}) => {
  const {start, paused} = useContext(SnakeContext)
        return (
    <div className={ !start && !paused ? "cursor-pointer" : "cursor-default"} onMouseLeave={() => handleHovered(0)} onMouseEnter={!start && !paused ? () => handleHovered(index) : () => {}} onClick={!start && !paused ? () => handleSelected(index) : () => {}} >
        <img className={ selected >= index ? "apple selected" : hovered >= index ? "apple hover" : "apple"} src="/apple.svg" alt="a" />
    </div>
  )
}

export default Apple   