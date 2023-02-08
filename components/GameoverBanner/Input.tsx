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
const Input = ({score}:{score: number}) => {

    const [input, setInput] = useState('')

    const inputRef = useRef<HTMLInputElement | null>(null)

     const mutation = useMutation({
        mutationFn: submit,
        onMutate: async() => {
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
                
            queryClient.setQueryData(['scores'], context.previousScores[0][1])
            }
        },
        onSuccess:() => {
             console.log('succ')
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
      <input onClick={(e) => handleFocus(e)} ref={inputRef} maxLength={3} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => mutation.mutate({name:input, score:score})}>Submit</button>
    </div>
  )
}

export default Input
