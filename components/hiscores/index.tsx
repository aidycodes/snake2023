import React from 'react'
import ScoreComponent from './Score'
import { useQuery } from '@tanstack/react-query'
import { fetchScores } from '../../lib/fetchers'



const HiScores = ({setShowHiScores}:{setShowHiScores:React.Dispatch<React.SetStateAction<boolean>>}) => {

 const {data} = useQuery({ queryKey: ['scores'], queryFn: fetchScores })
    const scores = data?.map((score: any, i: number) => (
       <ScoreComponent name={score.content.name} score={score.content.score} id={score.key} index={i} key={score.key}/> 
    ))

  return (
  
    <div className="glass absolute w-full top-16 right-0 lazyfade1 mediascores p-2 ">
      <div onClick={() => setShowHiScores(false)} className="absolute text-white z-10 xposition cursor-pointer scoreX ">x</div>
        {data ?
        scores
        :
       <div className="loader"/>
}
       
    </div>

  )
}

export default HiScores