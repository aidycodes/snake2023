import React from 'react'

const ScoreComponent = ({name, score, index, id}: any ) => {
  return (
    <div className="flex justify-between diffglass p-2 m-2 lazyfade ">
         <h2>{index+1}</h2>
        <h2> {name.toUpperCase()}</h2>
        <h2>{score}</h2>

        
    </div>
  )
}

export default ScoreComponent