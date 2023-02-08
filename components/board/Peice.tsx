import React from 'react'

const Peice = ({value}: {value:string}) => {

    if(value === 'O'){
        return (
            <div className='bg-red-600 border rounded-full h-6 w-6 border-red-400 animate-bounce'>
                <img src="/apple.svg" alt="" />
            </div>

        )
    }
     if(value === 'B'){
        return (
            <div className='bg-green-600 border rounded-full h-6 w-6 border-red-400 animate-bounce'></div>

        )
    }
    if(!value){
        return(
        <div className='bg-blue-600 h-full w-full border border-blue-400 rounded-md shadow-md'></div>
        )
    }
     if(value === '0'){
        return(
        <div className='bg-green-400 h-full w-full  animate-pulse'></div>
        )
    }
    if(value === 'X'){
        return(
        <div className='bg-red-700 h-full w-full  animate-pulse'></div>
        )
    }
    if(value === 'x'){
        return(
        <div className='bg-black h-full w-full border rounded-md'></div>
        )
    }
    if(value){
        return(
        <div className='bg-green-500 h-full w-full   border-green-500 z-10'></div>
        )
    }

  return (
    <div></div>
  )
}

export default Peice