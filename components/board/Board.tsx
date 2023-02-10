import React, { useContext, useEffect, useRef } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import Gameover from '../GameoverBanner/Gameover'
import Row from './Row'

const Board = () => {

    const  { board, score, gameOver, handleInput, start }  = useContext(SnakeContext)

const boardd = board.map(((row, i) => (
       <Row size="main" key={i} row={row}/>
        ))) 

        const controlRef = useRef<HTMLInputElement | null>(null)

 const focusFunction = () => { 
  if(controlRef.current !== null){
   
    controlRef.current.focus()
    }
 }    
 
 useEffect(() => {
  if(start){
    focusFunction()
  }
 },[start])

  return (
    <>
      <div onClick={() => focusFunction()} className="border border-red-400 p-4 mr-0 relative board-boarder">
    
    <div className="flex justify-center ">
      
    <div className="shadow-2xl">
        
       {boardd}
       <div> 
      {gameOver && <Gameover score={score}/>}
    </div>
    
    </div>
    
       </div>
      
      
    </div>
      <input ref={controlRef} type="text" value="" onChange={(e) => handleInput(e)} className="h-0 bg-pink-600  cursor-default opacity-0"></input>
    </>
  )
}

export default Board