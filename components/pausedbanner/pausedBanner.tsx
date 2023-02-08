import React, { useContext } from 'react'
import { SnakeContext } from '../../context/snakecontext'

const PausedBanner = () => {

const { paused } = useContext(SnakeContext)

  return (
    <>
    {paused &&
    <div className="text-red-500 text-4xl font-bold animate-pulse">Game Is Paused</div>
    }
    </>
  )
}

export default PausedBanner