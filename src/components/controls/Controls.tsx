import React, { Suspense, useContext, useEffect, useRef } from 'react'
import { SnakeContext } from '../../context/snakecontext'
//import MiniMap from '../minimap'
import Modal from '../modal'
import Button from './button/Button'
import Difficulty from './difficulty'
import NumberOfApples from './numberOfApples'

const MiniMap = React.lazy(() => import('../minimap'));

export interface RefObject {
  openModal: () => void
  closeModal: () => void
}

const Controls = () => {

  const {options, setOptions, start, gameOver} = useContext(SnakeContext)

    const handleOptions = (obj:{}) => {
        setOptions({...options, ...obj})
    }

        const mapRef = useRef<undefined | RefObject>()
        const playRef = useRef<undefined | RefObject>()

         const handleOpenMapModal = () => {
          if(mapRef.current){
          mapRef.current.openModal()
          }
        }

        const handleOpenPlayModal = () => {
          if(playRef.current){
          playRef.current.openModal()
          }
        }

        useEffect(() => {
          if(!gameOver && start){
            if(playRef.current){
            playRef.current.closeModal()
            }
            if(mapRef.current){
            mapRef.current.closeModal()
            }
          }

        },[gameOver,start])

  return (
   
    <div className="inline-flex flex-col my-20 bg-blue-500  p-2 rounded-md ml-0 shadow-lg">
       <Button  onClick={() => handleOpenPlayModal()}>how to play</Button>
               <div className="inline-block"><Difficulty level={options.level} handleOptions={handleOptions}/></div>
     
       <Button   onClick={() => handleOpenMapModal()}>Select Map</Button>   
     <NumberOfApples/>
     <div className="relative">
     <Modal type="play" ref={playRef}><>
   
     <h2 className=" w-fit playtitle play  rounded-md text-lg text-center p-2 font-bold text-blue-200">How To Play</h2>
     <div className=" p-2 text-lg play playtext text-blue-200 rounded-md ">In the game of Snake, the player uses the <span className="font-bold playtitle text-green-400">WASD</span> to move a "snake" around the board. As the snake finds food, it eats the food, and thereby grows larger. The game ends when the snake either moves off the screen or moves into itself. The goal is to make the snake as large as possible before that happens.</div></></Modal>
       </div>
     <div className="relative">
     <Modal type="map" ref={mapRef}><Suspense fallback={<div>Loading Maps</div>}><MiniMap/></Suspense></Modal>
     </div>
     <div className="z-0">
   
    </div>
    </div>
   
  )
}

export default Controls