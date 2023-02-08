
type coords = {
    y: number
    x: number
    found: number
   
}

export const findCoords = (board: string[][], position: string, appleCount: number) => {
    const coords = board.reduce((xy: coords, row, i ) => {
            const xIndex = row.findIndex((val) => val === position)
            if(xy.found !== 0 && position !== 'O'){
            return xy
            }
            if(position === 'O' && appleCount <= xy.found){
                return xy
            }
            if(xIndex !== -1){
                xy.x = xIndex 
                xy.found = xy.found+1       
                return xy
            } else {
            xy.y++
            }
        
            if(board.length-1 === i && xIndex === -1){
      
                xy.y = -1
                xy.x = -1
                return xy
            }
           console.log(xy, position)
            return xy   
        },{y:0, x:0, found:0})
        return coords

    }