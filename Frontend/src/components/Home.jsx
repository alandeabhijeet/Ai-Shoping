import React from 'react'
import HomeSlider from './HomeSlider'
import HomeCategeory from "./HomeCategeory"

const Home = () => {
  return (
    <div className='p-1 w-full min-h-screen text-stone-50 bg-gray-700 flex flex-col	 justify-center items-center'>
        <div className='w-full max-w-4xl h-136 flex justify-center relative'>
            <HomeSlider/>
        </div>
        < HomeCategeory/>
    </div>
  )
}

export default Home
