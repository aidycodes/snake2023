import React from 'react'
import Tile from './Tile'

interface RowProps {
    row: string[]
    size: string
}

const Row = ({row, size}: RowProps) => {
  return (
    <div className="flex">
        {row.map((tile, i) => (
            <Tile key={i} value={tile} size={size}/>
        ))}
    </div>
  )
}

export default Row