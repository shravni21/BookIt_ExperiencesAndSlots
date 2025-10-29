import React from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import ExperienceCard from '../components/ExperienceCard'

const Home = () => {
    return (
        <>
            <div>Home</div>
            <Navbar />
            <Loader />
            <ExperienceCard />
        </>
    )
}

export default Home