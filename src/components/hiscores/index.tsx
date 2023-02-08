import React from 'react'
import ScoreComponent from './Score'





const HiScores = () => {

    const fakeArray = [{score:33,name:"csm", index:0, id:0},{score:55,name:"csm"},{score:100,name:"csm",index:0, id:0},{score:36,name:"csm",index:0, id:0},{score:53,name:"csm",index:0, id:0}]

    const scores = fakeArray.map((score: any, i: number) => (
       <ScoreComponent name={score.name} score={score.score} id={score.id} index={i} key={i}/> 
    ))

  return (
    <div className="glass absolute w-full top-16 right-0 lazyfade1 ">
        <div className="flex justify-between p-2 m-2">
            <h2>Pos</h2>
            <h2>Name</h2>
            <h2>Score</h2>
        </div>
        {scores}
    </div>
  )
}

export default HiScores