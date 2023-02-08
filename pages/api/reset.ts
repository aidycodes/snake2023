import type { NextApiRequest, NextApiResponse } from "next"
import client, { getAndSortHiScores } from "../../database/reddis"

const reset = async(req: NextApiRequest,res: NextApiResponse) => {
    const use = {
        name:'CSM',
        score:42
    }
        Array.from({length: 10}, (value, index) => index+1)
            .forEach((value) => {
                const newUse = {
                    ...use,
                score:use.score+value
                }
      
            client.hset("hiscores", value, JSON.stringify(newUse))
    })
        const resetScores = await getAndSortHiScores()
        res.send({msg:"Reset Successful!", data:resetScores})

}
export default reset