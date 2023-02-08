import React, { useContext } from 'react'
import { SnakeContext } from '../../context/snakecontext'
import Button from '../controls/button/Button'

const ResetButton = () => {

    const { handleReset } = useContext(SnakeContext)
  return (
    <>
    <Button onClick={() => handleReset()}>Reset</Button> 
    
    
    </>
  )
}

export default ResetButton   