import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../pages'
import { Score } from '../../pages/api/getscores'

   const submit = async(score: {name: string, score: number}) => {
        try{
            
        const name = await axios.post('/api/addscore', score)
        console.log(name)
       
    }catch(err){
        console.log(err)
        throw err
    }
}
const Form = ({score}:{score: number}) => {

    const [input, setInput] = useState('')
    const [status, setStatus] = useState<boolean | string>('error')

    const inputRef = useRef<HTMLInputElement | null>(null)

     const mutation = useMutation({
        mutationFn: submit,
        onMutate: async() => {
            setStatus('loading')
            await queryClient.cancelQueries({queryKey:['scores']})
            const previousScores = queryClient.getQueriesData(['scores'])  
            console.log(previousScores)    
            queryClient.setQueriesData(['scores'], (old: any ) => {
                const data = old.filter((item: Score, i: number) => i < 9 )
                return [...data, {key:0,content:{score,name:input}}].sort((a,b) => b.content.score - a.content.score)       
            })
            return { previousScores }
        },
        onError(error, variables, context) {
            console.log('err')
            if(context){
              setStatus('error')  
            queryClient.setQueryData(['scores'], context.previousScores[0][1])
            }
        },
        onSuccess:() => {
             setStatus('success')
            queryClient.invalidateQueries({queryKey:['scores']})
           
        },
          onSettled: () => {
             console.log('sett')
   // queryClient.invalidateQueries({ queryKey: ['hiscores'] })
  },
    })

    useEffect(() => {
        if(inputRef.current){
         inputRef.current.focus()
        }
    },[])
    const handleFocus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
         e.stopPropagation();
    }
  return (
    <div>
        <div className="flex justify-center my-4">
        <input className="input"
        onClick={(e) => handleFocus(e)} ref={inputRef} maxLength={3} onChange={(e) => setInput(e.target.value)} />
        <button className="px-4 py-2 mx-2 text-neutral-100  button border-neutral-100 border" onClick={() => mutation.mutate({name:input, score:score})}>Submit</button>
           
        </div>
         {status && status === "success" ? <div className="flex justify-center space"><p className="text-white">Your Score Was Successfully Recorded</p></div> :
          status === "error" ? <div className="flex justify-center space"><p className="errorred">whoops, an <span className="font-bold">error</span> has occured please try again</p></div> :
           status === 'loading' ? <div className="flex justify-center"><div className="lds-ellipsis mx-auto"><div></div><div></div><div></div><div></div></div></div>
         : null
         }
    </div>
  )
}

export default Form
