import type { NextPage } from 'next'
import React, { Suspense, useState, useEffect } from 'react';

import Board from '../components/board/Board';
import Bonus from '../components/bonus.tsx/bonus';
import Button from '../components/controls/button/Button';
import Controls from '../components/controls/Controls';
import PausedBanner from '../components/pausedbanner/pausedBanner';
import ResetButton from '../components/resetbutton/reset';
import ScoreBoard from '../components/scoreboard/ScoreBoard';
import StartButton from '../components/startbutton/startbutton';
import SnakeProvider from '../context/snakecontext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { fetchScores } from '../lib/fetchers';

const HiScores = React.lazy(() => import('../components/hiscores'));

  export interface Options {
    level:number,
    map:number
} 

export const queryClient = new QueryClient()

const Home: NextPage = () => {
 
       const [showHiScores, setShowHiScores] = useState(false)

       useEffect(() => {
        const data = fetchScores()
        console.log(data)
       },[])
 
  return (
    <SnakeProvider>
    <QueryClientProvider client={queryClient}>
    <div className="bg-blue-500 h-screen ">
     <p className="text-blue-300">AoC2022</p>
     <h1 className="text-center text-4xl my-8 shadows z-10">Snake</h1>
     <div className="flex justify-center pt-16">
     <PausedBanner/>
    
     </div>
     <div className="center">
     
     <div className="my-6 mx-auto  flex justify-center   ">
     <div> 
   <ScoreBoard/>
   
   <div className="relative">
        <Button  onClick={() => setShowHiScores(!showHiScores)}>LeaderBoard</Button>
        {showHiScores &&
        <Suspense fallback={<div className="loader"></div>}>
          <HiScores/>
        </Suspense>
        }
        </div>
   </div>
       <div className="mt-10 mx-10 mb-0">
             
     <Board />
 
     </div>
    <div className="self-start">
       <Bonus/> 
       <Controls />
 </div>
     </div>

        <div className="flex  justify-center closer gap-10  ">
       <StartButton/>
       <ResetButton/>

      
    </div>

    </div>

    </div>
    </QueryClientProvider>
    </SnakeProvider>
  )
}

export default Home
