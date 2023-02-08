import React, { useContext, useEffect, useState } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import { useQuery } from '@tanstack/react-query'
import { fetchScores } from '../../lib/fetchers'
import Input from './Input'

const Gameover = ({score}:{score:number}) => {

  const { gameOver, options, bonus  } = useContext(SnakeContext)

  const [show, setShow] = useState(false)

     const {data} = useQuery ({ queryKey: ['scores'], queryFn: fetchScores })
  if(data){
     console.log(data[data.length-1])
  }
  useEffect(() => {
    if(gameOver){
      setShow(true)
    }
  },[gameOver])

  const currentScore = (score * options.level) + bonus.score * (options.level*2)

  return (
    <>
    {show &&
    <div className="glass absolute gameoveposition gameover p-10 rounded-md shadow-sm">
      <div onClick={() => setShow(false)} className="text-xl font-bold text-blue-700 hover:text-blue-400 cursor-pointer absolute right-0 p-4 top-0">X</div>
      <p className="text-red-500 text-4xl text-center font-mono">Game Over!</p>
      <p className="text-purple-600 text-xl py-2">Your Score: {(score * options.level) + bonus.score * (options.level*2)}</p>
      <Input score={currentScore}/>
      {
      data ? 
      
      score > data[data.length-1]
   ?
      <p>Sorry you did not make the Hi-score list this time <span className='text-blue-700 cursor-pointer hover:text-blue-500'>try again!</span></p>
       :   <p>Congratulations You Made The Leaderboards! Please Enter Your Name To Submit Your Score!</p> 
      : <p>loading...</p>  }
      </div>
}
      </>
  )
}

export default Gameover