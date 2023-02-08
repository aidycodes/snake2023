import type { NextApiRequest, NextApiResponse } from "next"
import { getAndSortHiScores } from "../../database/reddis"

export interface Score {
    key: string
    content: string
}

const getScore = async(req: NextApiRequest,res: NextApiResponse) => {
    try{ 
        if(req.method !== 'GET'){
            res.send({msg:'Wrong Method Type'})
        } 
        const sortedScores: Score[] = await getAndSortHiScores() 
        res.send(sortedScores)
    
    }catch(err){
        console.log(err)
    }
}
export default getScore