import React, { useContext } from 'react'
import { SnakeContext } from '../../context/snakecontext'

const ScoreBoard = () => {

  const {score, bonus, options} = useContext(SnakeContext)

  return (
      <div className={ "inwardsscore bg-blue-400 h-fit p-4 min-w-fit my-20 box"}>
       <div className="">
        <div className="text-white p-2 text-xl font-mono">Score: {(score * options.level) + bonus.score * (options.level*2) } </div>
        </div>
    

      </div>
  )
}

export default ScoreBoard