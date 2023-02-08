import React from 'react'

const ScoreComponent = ({name, score, index, id}: any ) => {
  return (
    <div className="flex justify-between diffglass p-1 m-1 lazyfade ">
         <h2 className="w-6">{index+1}</h2>
        <h2> {name.toUpperCase()}</h2>
        <h2>{score}</h2>

        
    </div>
  )
}

export default ScoreComponent