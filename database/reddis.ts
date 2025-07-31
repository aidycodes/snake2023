import Redis  from "ioredis"

const client = new Redis("rediss://default:ATO0AAIjcDEzM2U5Y2RiYjg2YWQ0MmE3YTkxMTA4ZjQ0ZTcwMTUzYXAxMA@knowing-terrier-13236.upstash.io:6379");
//console.log(process.env.REDIS, 'dd')

client.on('error', (err) => {
        console.error('Redis Client Error', err);
      });

export const getAndSortHiScores = async() => {
        const newData = await client.hgetall("hiscores")
        console.log(newData, 'ddd')
      const arrayOfObj = Object.entries(newData).map((e) => (  {key:e[0], content:JSON.parse(e[1]), } ))

      console.log(arrayOfObj)

        return arrayOfObj.sort((a, b) => b.content.score - a.content.score)
       
    
}

export default client