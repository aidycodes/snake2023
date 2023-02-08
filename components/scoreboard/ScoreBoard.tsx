import React, { useContext, useState } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import { fetchScores } from '../../lib/fetchers'
import { useQuery } from '@tanstack/react-query'

const ScoreBoard = () => {

  const {score, bonus, options} = useContext(SnakeContext)



  return (
      <div className={ "inwardsscore bg-blue-400 h-fit p-4 min-w-fit my-20 box"}>
       <div className="">
        <h4 className="text-white p-2 text-xl font-mono">Score: {(score * options.level) + bonus.score * (options.level*2) } </h4>
        </div>
    

      </div>
  )
}

export default ScoreBoard