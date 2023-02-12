import React, { useContext } from 'react'
import { SnakeContext } from '../../../context/snakecontext'

const Button = ({children, onClick}:{children:string, onClick:() => void}) => {

  const { start, paused } = useContext(SnakeContext)

  const clickCheck = () => {
    console.log({start, paused})
    if(!start && !paused){
      onClick()
    }
  }

  return (
    <>
    {children === 'Pause' || children === 'Start' || children === "Reset" ? 
      <div onClick={() => onClick()} className={'diffglass mainbutton my-4'} >
        <h4 className="text-center">{children}</h4>
    </div> 
    :
    <div onClick={() => clickCheck()} className={ start || paused ?  'diffglass-disabled mainbutton-disabled my-4' : 'diffglass mainbutton my-4'} >
        <h4 className="text-center button-text">{children}</h4>
    </div>
  }
  </>
  )
}

export default Button