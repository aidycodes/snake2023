import React from 'react'

const ScoreComponent = ({name, score, index, id}: any ) => {
  return (
    <div className="flex justify-between diffglass p-1 m-1 lazyfade mediascore ">
         <h2 className="w-6 score-font">{index+1}</h2>
        <h2 className='score-font'> {name.toUpperCase()}</h2>
        <h2  className='score-font'>{score}</h2>

        
    </div>
  )
}

export default ScoreComponent