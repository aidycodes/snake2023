import React, { useContext } from 'react'
import { SnakeContext } from '../../../context/snakecontext'

const Button = ({children, onClick}:{children:string, onClick:() => void}) => {

  const { start, paused } = useContext(SnakeContext)

  return (
    <>
    {children === 'Pause' || children === 'Start' || children === "Reset" ? 
      <div onClick={() => onClick()} className={'diffglass mainbutton my-4'} >
        <h4 className="text-center">{children}</h4>
    </div> 
    :
    <div onClick={ !start || !paused ? () => onClick() : () => {}} className={ start || paused ?  'diffglass-disabled mainbutton-disabled my-4' : 'diffglass mainbutton my-4'} >
        <h4 className="text-center button-text">{children}</h4>
    </div>
  }
  </>
  )
}

export default Button