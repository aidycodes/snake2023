import React from 'react'
import Peice from './Peice'

interface TileProps {
    value: string
    size: string
}

const Tile = ({value, size}: TileProps) => {

  return (
    <div className={ size === "main" ? "maintileheight border-emerald-300 flex justify-center items-center bg-blue-500 z-0" : "minitileheight border-emerald-300 flex justify-center items-center bg-blue-500 z-0" }>
        {/* <div className={value === 'O' ? 'bg-red-600 border rounded-full h-6 w-6 border-red-400' : value ? 'bg-green-300 h-full w-full' : 'none'}> */}
           <Peice value={value}/>
        {/* </div> */}
    </div>
  )
}

export default Tile