import React, { useContext } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import Button from '../controls/button/Button'

const StartButton = () => {

    const { handleStart, start } = useContext(SnakeContext)
  return (
    <>
    {!start ?
    <Button onClick={() => handleStart()}>Start</Button> :
    <Button onClick={() => handleStart()}>Pause</Button>
    }
    </>
  )
}

export default StartButton   