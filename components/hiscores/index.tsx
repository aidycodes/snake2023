import React from 'react'
import ScoreComponent from './Score'
import { useQuery } from '@tanstack/react-query'
import { fetchScores } from '../../lib/fetchers'



const HiScores = () => {

 const {data} = useQuery({ queryKey: ['scores'], queryFn: fetchScores })
    const scores = data?.map((score: any, i: number) => (
       <ScoreComponent name={score.content.name} score={score.content.score} id={score.key} index={i} key={score.key}/> 
    ))

  return (
  
    <div className="glass absolute w-full top-16 right-0 lazyfade1 ">
        <div className="flex justify-between p-1 m-1">
            <h2>Pos</h2>
            <h2>Name</h2>
            <h2>Score</h2>
        </div>
        {data ?
        scores
        :
       <div className="loader"/>
}
       
    </div>

  )
}

export default HiScores