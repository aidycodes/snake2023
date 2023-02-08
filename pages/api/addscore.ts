import type { NextApiRequest, NextApiResponse } from "next"
import client, { getAndSortHiScores } from "../../database/reddis"

interface score {
    key: string
    content: string
}

const addScore = async(req: NextApiRequest,res: NextApiResponse) => {
    try{  
     if(req.body.name === 'err'){
        throw new Error('err name error')
     }
        const sortedObjs: score[] = await getAndSortHiScores()
            if(sortedObjs.length === 10){      
                const lowestScore = sortedObjs[sortedObjs.length-1]
                if(lowestScore){
                    await client.hdel("hiscores", lowestScore.key);
                 await client.hset("hiscores", lowestScore.key, JSON.stringify(req.body))
            }   else {
                    await client.hset("hiscores", sortedObjs.length, JSON.stringify(req.body))  
            }    
    }
          const updatedAndSortedData = await getAndSortHiScores()
          //console.log(updatedAndSortedData)
        res.send(updatedAndSortedData)
    
    }catch(err){
       res.status(403).send({err})
    }
}
export default addScore

