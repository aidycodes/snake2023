import React, { useContext, useEffect, useState } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import { useQuery } from '@tanstack/react-query'
import { fetchScores } from '../../lib/fetchers'
import Form from './Input'

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
    {show && data &&
    <div className={currentScore > data[data.length-1].content.score ? "glass absolute gameoveposition gameover p-10 rounded-md shadow-sm gameoversize"
  : "glass absolute gameoveposition gameover p-10 rounded-md shadow-sm "
  }>
      <div onClick={() => setShow(false)} className="text-xl font-bold text-blue-700 hover:text-blue-400 cursor-pointer absolute right-0 p-4 top-0">X</div>
      <p className="text-red-500 text-4xl text-center font-mono">Game Over!</p>
      <p className="text-purple-600 text-xl py-2">Your Score: {(score * options.level) + bonus.score * (options.level*2)}</p>
    
      {
      data ? 
      
      currentScore < data[data.length-1].content.score
   ?
      <p>Sorry you did not make the Hi-score list this time. </p>
       :   
        <>  <p>Congratulations You Made The Leaderboards! Please Enter Your Name To Submit Your Score!</p>
        {console.log(data[data.length-1])}
         <Form score={currentScore}/>  </>
      : 
      <div className="flex justify-center my-10 py-10">
      <div className="lds-ellipsis mx-auto"><div></div><div></div><div></div><div></div></div>
      </div>
      }
      </div>
}
      </>
  )
}

export default Gameover