import React, { useContext, useState } from 'react'
import { SnakeContext } from '../../context/snakecontext'

const ScoreBoard = () => {

  const {score, bonus, options} = useContext(SnakeContext)

  return (
      <div className={ "inwardsscore bg-blue-400 h-fit p-4 min-w-fit my-20 box"}>
       <div className="">
        <p className="text-white p-2 text-xl font-mono">Score: {(score * options.level) + bonus.score * (options.level*2) } </p>
        </div>
    

      </div>
  )
}

export default ScoreBoard