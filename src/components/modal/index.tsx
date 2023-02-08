import React, { forwardRef, ReactElement, useImperativeHandle, useState } from 'react'




const Modal = ({children, type }:{children:string | ReactElement, type: string},ref:any) => {

    const [open, setOpen] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      openModal:() => setOpen(!open),
      closeModal:() => setOpen(false)
    })
  )
 
  return (
    <>
      { open ?
        <div className={ type === "map" ? `lazyfade1 glass p-2 rounded-md shadow-xl modalmap bg-blue-300 absolute` : ` diffglass border-dashed border-2 p-4 rounded-md shadow-xl modalplay bg-blue-300 absolute `}>
          <div className={type === "map" ? `xplacement absolute px-4 py-2 text-md text-blue-800 font-bold cursor-pointer hover:text-blue-500`:
          `xplacement absolute px-4 py-2 text-md text-blue-800 font-bold cursor-pointer hover:text-blue-300`
          }
          onClick={() => setOpen(false)}>X</div>
          <div className={ type !== "map" ? " p-2  text-gray-900   rounded-md":"text-gray-900  "}>{children}</div></div>
      : <></>
      }
  </>
  )
}

export default forwardRef(Modal)