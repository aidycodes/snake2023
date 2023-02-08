import Redis  from "ioredis"

const client = new Redis("redis://default:ca89b4d969a1456a8aa767915c971a5b@eu1-ample-marmot-38123.upstash.io:38123");

export const getAndSortHiScores = async() => {
        const newData = await client.hgetall("hiscores")
       const arrayOfObj = Object.entries(newData).map((e) => (  {key:e[0], content:JSON.parse(e[1]), } ))
        return arrayOfObj.sort((a, b) => b.content.score - a.content.score)
}

export default client