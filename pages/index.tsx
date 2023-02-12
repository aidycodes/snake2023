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
import Warning from '../components/screenwarning'
import SnakeProvider from '../context/snakecontext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { fetchScores } from '../lib/fetchers';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

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
    <div className="bg-blue-500  media-app">
   <Warning/>
     <p className="text-blue-300 aoc">AoC2023</p>
   
     <h1 className="text-center text-4xl my-8 shadows z-10 title  ">Snake</h1>
     
     <div className="flex justify-center pt-16 ">
     <PausedBanner/>
    
     </div>
     <div className="center">
     
     <div className="my-6 mx-auto  mainflex ">
     <div className="flexitem1"> 
   <ScoreBoard/>
   
   <div className="relative">
        <Button  onClick={() => setShowHiScores(!showHiScores)}>LeaderBoard</Button>
        {showHiScores &&
    <ErrorBoundary>
        <Suspense fallback={<div className="loader"></div>}>
          <HiScores setShowHiScores={setShowHiScores}/>
        </Suspense>
    </ErrorBoundary>
}
        </div>
   </div> 
       <div className="mt-10 mx-10 mb-0 flexitem2">
             
     <Board />
 
     </div>
    <div className="self-start flexitem3">
       <Bonus/> 
       <Controls />
 </div>
     </div>

        <div className=" start-reset  ">
          <div className="inner-start">
       <StartButton/>
       <ResetButton/>
       </div>
        <h2 className="title2 shadows">Snake</h2>
      
    </div>

    </div>

    </div>
    </QueryClientProvider>
    </SnakeProvider>
  )
}

export default Home
