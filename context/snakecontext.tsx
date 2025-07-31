import { createContext, Dispatch, ReactNode, useCallback, useEffect, useState } from "react";
import useInterval from "../components/hooks/useInterval";
import { findCoords } from "../components/utils/utils";
import { gameboards } from "../lib/boards";

  export interface Options {
    level:number,
    map:number
} 

type Bonus = {
    score: number
    timeOut: number | boolean
}

export interface Snake {
    score: number 
    bonus:Bonus
    board: string[][]
    boards:string[][][]
    start: boolean
    gameOver:boolean
    paused:boolean
    setBoard:Dispatch<React.SetStateAction<string[][]>>
    options: Options
    setOptions:Dispatch<React.SetStateAction<Options>>
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void 
    handleStart: () => void
     handleReset: () => void
    handleNumberOfApples: (count: number) => void
}

const speeds = [
    300,
    250,
    220,
    180,
    140,
    120,
    90,
    60,
    40,
    20
]

export const SnakeContext = createContext<Snake>({
    board:gameboards[0],
    start:false,
    paused:false,
    score:0,
    bonus:{score:0,timeOut:false},
    boards:[[[""]]],
    gameOver:false,
    options:{level:3, map:0},
    setBoard:() => {},
    setOptions:() => {},
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => {},
    handleStart:() => {}, 
    handleReset:() => {},
    handleNumberOfApples: (count: number) => {}

});








const SnakeProvider = ({children}:{children:ReactNode}) =>  {



//feature structuredClone does not seem to work with next/typescript currently 
//const boards = structuredClone(gameboards)
const boards = JSON.parse(JSON.stringify(gameboards))

     const [numberOfApples, setNumberOfApples] = useState(1)
     const [appleCount, setAppleCount] = useState(0)
    
    const [start, setStart] = useState(false)
    const [go, setGo]= useState(true)
    const [paused, setPaused] = useState(false)
    const [score, setScore] = useState(0)
    const [bonus, setBonus] = useState<Bonus>({score:0, timeOut:false})
    const [gameOver, setGameOver] = useState(false)
    const [direction, setDirection] = useState('w')
    const [options, setOptions]  = useState<Options>({
        level:7,
        map:0,      
        })
  const [board, setBoard] = useState([...boards[options.map]])

    const moveTail = (length: number, position: string, x1: number, y1: number, updatedBoard: string[][] ): void => {
        if(length >= +position){
         let {x, y} = findCoords(updatedBoard, position, numberOfApples)
              
        if(x === -1 && y === -1){
            updatedBoard[y1][x1] = position
            return
        }      
           
                 updatedBoard[y][x] = ""
             updatedBoard[y1][x1] = position
             let nextPosition = Number(position)
             nextPosition++
             let stringedPosition = nextPosition.toString()
          
             moveTail(score, stringedPosition,x,y, updatedBoard )
           
        } 
    }


    // for(let i = position; score >= position ; i++){
    //     let {x, y} = findCoords(updatedBoard, position, numberOfApples)
    //        if(x === -1 && y === -1){
    //         updatedBoard[y1][x1] = position
    //         return
    //     }
    //         updatedBoard[y][x] = ""
    //          updatedBoard[y1][x1] = position   
    // }


    const moveSnake = (position: string, updatedBoard: string[][] = [...board]): void => {
       
        const coords = findCoords(updatedBoard, position, numberOfApples)
        let { x, y } = coords
        
        updatedBoard[y][x] = ""
        
        switch(direction){
            case 'w':    
                if(y === 0){
                   y = board.length
                }
                if(updatedBoard[y-1][x] === 'O'){
                    handleAppleCollection()
                     setAppleCount((count) => count-1)
                }
                if(updatedBoard[y-1][x] === 'B'){
                    handleBonusCollection()
                    
                }
                 if(updatedBoard[y-1][x] && updatedBoard[y-1][x] !== 'O' && updatedBoard[y-1][x] !== 'B' ){
                  
                    setStart(false)
                    setDirection('w')
                    setGameOver(true)
                    setPaused(false)
                    position = 'X'
                     
                }
                updatedBoard[y-1][x] = position
               
                if(+position < score){
                  
                    if(y === 10){
                        y = 0
                    }
            let x1 = x
            let y1 = y
        


                moveTail(score,"1", x, y, updatedBoard)
    
            }
            setBoard([...updatedBoard])
             setGo(true)
            return
            case 's':
                if(y === board.length-1){  
                    y = -1
                }
                if(updatedBoard[y+1][x] === 'O'){
                    handleAppleCollection()
                    setAppleCount((count) => count-1)
                }
                   if(updatedBoard[y+1][x] === 'B'){
                    handleBonusCollection()
                }
                //T
                 if(updatedBoard[y+1][x] && updatedBoard[y+1][x] !== 'O' && updatedBoard[y+1][x] !== 'B'){
                   
                    setStart(false)
                    setGameOver(true)
                    setPaused(false)
                    setDirection('w')
                     position = 'X'
                } 
                updatedBoard[y+1][x] = position
                if(y === -1){
                    y = 9 
                }
                
                setBoard([...updatedBoard])  
                setGo(true) 
                moveTail(score,"1", x, y, updatedBoard)

            
            return
            case 'd':
                if(x === board[y].length-1){  
                    x = -1
                }
                 if(updatedBoard[y][x+1] === 'O'){
                    handleAppleCollection()
                     setAppleCount((count) => count-1)
                }
                  if(updatedBoard[y][x+1] === 'B'){
                    handleBonusCollection()
                }
                
                    //T
                 if(updatedBoard[y][x+1] && updatedBoard[y][x+1] !== 'O' && updatedBoard[y][x+1] !== 'B'){
               
                    setStart(false)
                    setGameOver(true)
                    setPaused(false)
                    setDirection('w')
                     position = 'X'
                } 
                
                updatedBoard[y][x+1] = position
                if(x === -1){
                    x = board.length
                }
                moveTail(score,"1", x, y, updatedBoard)

            setBoard([...updatedBoard])
             setGo(true)
            return
            case 'a':
                if(x === 0){  
                    x = board[y].length
                }
                if(updatedBoard[y][x-1] === 'O'){
                    handleAppleCollection()
                     setAppleCount((count) => count-1)
                }
                  if(updatedBoard[y][x-1] === 'B'){
                    handleBonusCollection()
                }
                
                         //T
                 if(updatedBoard[y][x-1] && updatedBoard[y][x-1] !== 'O' && updatedBoard[y][x-1] !== 'B'){
                 
                    setStart(false)
                    setGameOver(true)
                    setPaused(false)
                    setDirection('w')
                     position = 'X'
                } 
                
                updatedBoard[y][x-1] = position
                if(x === 11){
                    x = 0
                }   
                moveTail(score,"1", x, y, updatedBoard)

            setBoard([...updatedBoard])
             setGo(true)
            return
            default:
                return      
   }
       
}

    // const updatedBoard = [...board]
    //     updatedBoard[2][5] = "x"
    //     setBoard([...updatedBoard, ])

useEffect(() => {
    if(start){
       
        const interval = setInterval(() => {
                    moveSnake('0')
        },speeds[options.level])    
    return () => clearInterval(interval)
    }
})

const cachedReset = useCallback(() =>{
   
    setScore(0)
    setBoard([...boards[options.map]])

},[boards, options.map])


const handleReset = () => {
    setScore(0)
    setBonus({...bonus, score:0})
    setAppleCount(0)
    setGameOver(false)
    setBoard([...boards[options.map]])
    setStart(false)
    setDirection('w')
    setPaused(false)
}

const handleNumberOfApples = (count: number) => {
    setNumberOfApples(count)
}

const cachedApple = useCallback((targetCount: number = numberOfApples) =>{
    console.log('cachedApple called with targetCount:', targetCount, 'numberOfApples:', numberOfApples)
    const generateApple = (count: number) => {
        // Check if we need more apples (accounting for the one that was just eaten)
        const currentAppleCount = findCoords(board, 'O', numberOfApples).found
        console.log('currentAppleCount:', currentAppleCount, 'targetCount:', targetCount)
        
        // Only subtract 1 if we're replacing an eaten apple (when appleCount is being decremented)
        // At game start, appleCount is 0, so we don't subtract 1
        const shouldSubtractOne = appleCount > 0 && targetCount === numberOfApples
        const actualAppleCount = shouldSubtractOne ? currentAppleCount - 1 : currentAppleCount
        console.log('actualAppleCount (after adjustment):', actualAppleCount, 'shouldSubtractOne:', shouldSubtractOne, 'appleCount:', appleCount)
        
        if(actualAppleCount < targetCount){
            console.log('Generating apple, current:', actualAppleCount, 'target:', targetCount)
            let x = Math.floor(Math.random() * board[0].length-1) + 1
            let y = Math.floor(Math.random() * board.length-1) + 1
            if(board[y][x]){
                console.log('Collision, retrying')
                generateApple(count)  // Try again with same count
                return
            }
            const updatedBoard = [...board]
            updatedBoard[y][x] = 'O'
            setBoard([...updatedBoard])
            setAppleCount((appleCount) => appleCount+1)
            console.log('Apple generated at:', x, y)
            
            // Recursively generate more apples if needed
            if(actualAppleCount + 1 < targetCount){
                console.log('Generating more apples')
                generateApple(count)
            }
        } else {
            console.log('No more apples needed')
        }
    }  
    generateApple(targetCount)
} ,[board, numberOfApples, appleCount])

const generateBonus = () => {
    const {y} = findCoords(board, 'B', numberOfApples)
    if(y === -1){
    let x = Math.floor(Math.random() * board[0].length-1) + 1
    let y = Math.floor(Math.random() * board.length-1) + 1
    if(board[y][x]){
     generateBonus()
        return
    }
    const updatedBoard = [...board]
    updatedBoard[y][x] = 'B'
    setBonus({...bonus, timeOut:10})
    setBoard([...updatedBoard])
}
}

useInterval(() => {
if(typeof bonus.timeOut === 'number'){
    if(bonus.timeOut >= 1){       
        setBonus({...bonus, timeOut:bonus.timeOut-1})
        
    }
    if(bonus.timeOut === 0){
        setBonus({...bonus, timeOut:false})
    }
}
},start ? 1000 : null)

useEffect(() => {
    if(bonus.timeOut === 0){
         const {y, x} = findCoords(board, 'B', numberOfApples)
         if(y === -1){
            return
         }
          const updatedBoard = [...board]
             updatedBoard[y][x] = ''
             setBoard([...updatedBoard])
             setBonus({...bonus, timeOut:false})
}
    
},[bonus, board, numberOfApples])

useEffect(() => {
    if(score !== 0 && score % 5 === 0){
        generateBonus()
    }
},[score])

useEffect(() => {
    if(start){
        if(gameOver){
             setAppleCount(0)
            cachedReset()
        setGameOver(false)
        }
    }
},[start, gameOver, cachedReset])

// Separate useEffect for initial apple generation
useEffect(() => {
    if(start && !gameOver && appleCount === 0){
        // Only generate initial apple when game starts and no apples exist
        cachedApple()
    }
},[start, gameOver, appleCount])


const handleStart = () => {
    if(!start && !gameOver){
        setStart(!start)
        setPaused(false)
       
    }
    if(!start && gameOver){
    setScore(0)
    setBoard([...boards[options.map]])
    setStart(!start)
   
    }
    if(start && !gameOver){
        setStart(!start)
        setPaused(true)
        
    }
}

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase()
    console.log({input, direction})
    if(go){
        if(score === 0){
    if( 
        (input === 'a' ) ||
      (input === 'd' ) ||
       (input === 's') ||
        (input === 'w' ) ){
        setDirection(input.toLowerCase())
        setGo(false)
    } 
}
     if
     ((input === 'a' && direction != 'd') ||
      (input === 'd' && direction != 'a') ||
       (input === 's' && direction != 'w') ||
        (input === 'w' && direction != 's')) { 
            console.log('meep')
        setDirection(e.target.value.toLowerCase())
        setGo(false)
     } 
    }
}




// const generateApple = () => {
//     let x = Math.floor(Math.random() * board[0].length-1) + 1
//     let y = Math.floor(Math.random() * board.length-1) + 1
//     if(board[y][x] === 'x'){
//         generateApple()
//         return
//     }
//     const updatedBoard = [...board]
//     updatedBoard[y][x] = 'O'
//     setBoard([...updatedBoard])
// }

const handleAppleCollection = () => {
    setScore((score: number) => score+1)
    cachedApple()
}
const handleBonusCollection = () => {
    setBonus({timeOut:false, score:bonus.score+1})
}


const boardApp: Snake = { handleReset, handleNumberOfApples, bonus, score, board, gameOver, options, handleInput, handleStart, setOptions, start, boards, setBoard, paused }
  
  return( 
    
      <SnakeContext.Provider value={boardApp}>
        {children}
      </SnakeContext.Provider>
    );
  }

export default SnakeProvider
