import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>🍳 Discover & Share Delicious Recipes</h1>
                    <h5>Welcome to your culinary community! Explore mouthwatering recipes from food lovers around the world, save your favorites, and share your own signature dishes. Whether you're a seasoned chef or just starting your cooking journey, there's always something new to discover.</h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodRecipe} width="320px" height="300px"></img>
                </div>
            </section>

            <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none"><path fill="#D3D3FF" fillOpacity="1" d="M0,0L40,10C80,20,160,40,240,60C320,80,400,100,480,110C560,120,640,120,720,110C800,100,880,80,960,80C1040,80,1120,100,1200,110C1280,120,1360,120,1400,120L1440,120L1440,200L1400,200C1360,200,1280,200,1200,200C1120,200,1040,200,960,200C880,200,800,200,720,200C640,200,560,200,480,200C400,200,320,200,240,200C160,200,80,200,40,200L0,200Z"></path></svg>
            </div>

            {(isOpen) &&
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm setIsOpen={() => setIsOpen(false)} />
                </Modal>
            }

            <div className='recipe'>
                <RecipeItems />
            </div>
        </>
    )
}
