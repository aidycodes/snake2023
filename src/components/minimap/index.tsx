import React, { useContext } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import Row from '../board/Row'


const MiniMap = () => {

    const {boards, setOptions, options, setBoard}  = useContext(SnakeContext)

    const handleMapChange = (index: number) => {
        setOptions({...options, map:index})
         setBoard([...boards[index]])
    }

    const board = boards.map((map, i) => {
        return(
        <div key={i} onClick={() => handleMapChange(i)} className="lazyfade p-1 z-50 cursor-pointer border-4 border-transparent bg-transparent w-fit float-left hover:border-4 hover:border-slate-700">{map.map((item, i) => {
        return <Row key={i} size="mini" row={item}></Row>})}</div>
        )
    })
    
    return (
    <div className="z-50">{board}</div>
  )
}

export default MiniMap