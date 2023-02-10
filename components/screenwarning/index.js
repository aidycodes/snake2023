import React from 'react'
import { Modal } from '../modal'

const Warning = () => {
  return (
    <div className=" diffglass border-dashed border-2 p-4 rounded-md shadow-xl bg-blue-300 warning-pop-up ">
      <p className="text-white fontsize">This Game Is Designed For ScreenWidths 600px and Above</p>
    </div>
  )
}

export default Warning
