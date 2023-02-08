 export const fetchScores = async() => {
    const data = await fetch('/api/getscores')
    const parsedData = await data.json()
    return parsedData
  }
