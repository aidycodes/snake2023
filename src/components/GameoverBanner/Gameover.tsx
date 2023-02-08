import React, { useContext, useEffect, useState } from 'react'
import { SnakeContext } from '../../context/snakecontext'

const Gameover = ({score}:{score:number}) => {

  const { gameOver, options, bonus } = useContext(SnakeContext)

  const [show, setShow] = useState(false)

  useEffect(() => {
    if(gameOver){
      setShow(true)
    }
  },[gameOver])

  return (
    <>
    {show &&
    <div className="glass absolute gameoveposition   gameover   p-10 rounded-md shadow-sm animate-bounce">
      <div onClick={() => setShow(false)} className="text-xl font-bold text-blue-700 hover:text-blue-400 cursor-pointer absolute right-0 p-4 top-0">X</div>
      <p className="text-red-500 text-4xl text-center font-mono">Game Over!</p>
      <p className="text-purple-600 text-xl py-2">Your Score: {(score * options.level) + bonus.score * (options.level*2)}</p>
      <p>Sorry you did not make the Hi-score list this time <span className='text-blue-700 cursor-pointer hover:text-blue-500'>try again!</span></p>
      
      </div>
}
      </>
  )
}

export default Gameover