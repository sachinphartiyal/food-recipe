import React, { useState, useEffect } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import { useNavigate, useLoaderData } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import axios from 'axios'

export default function Home() {
    const navigate = useNavigate()
    const initialRecipes = useLoaderData()
    // Controls whether the login/signup modal is visible.
    const [isOpen, setIsOpen] = useState(false)

    // Search and filter state

    // Stores search input text
    const [searchQuery, setSearchQuery] = useState('')

    // Stores selected filters
    const [filters, setFilters] = useState({
        category: 'All',
        difficulty: 'All',
        maxTime: 'All'
    })

    // Stores recipes after applying search & filters
    const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes)

    // Shows loading indicator while fetching data
    const [isLoading, setIsLoading] = useState(false)

    // Debounced search and filter effect
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchFilteredRecipes()
        }, 300) // 300ms debounce

        // Cancels the previous timer before starting a new one
        return () => clearTimeout(timer)
    }, [searchQuery, filters])

    const fetchFilteredRecipes = async () => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams()

            // append(name, value)
            if (searchQuery) params.append('search', searchQuery)
            if (filters.category !== 'All') params.append('category', filters.category)
            if (filters.difficulty !== 'All') params.append('difficulty', filters.difficulty)
            if (filters.maxTime !== 'All') params.append('maxTime', filters.maxTime)

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/recipe?${params.toString()}`
            )

            setFilteredRecipes(response.data)
        } catch (error) {
            console.error('Error fetching recipes:', error)
            setFilteredRecipes([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearchChange = (query) => {
        setSearchQuery(query)
    }

    const handleClearSearch = () => {
        setSearchQuery('')
    }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const handleClearFilters = () => {
        setFilters({
            category: 'All',
            difficulty: 'All',
            maxTime: 'All'
        })
        setSearchQuery('')
    }

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
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onClearSearch={handleClearSearch}
                />

                <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                {isLoading ? (
                    <div className='loading-state'>Loading recipes...</div>
                ) : filteredRecipes.length === 0 ? (
                    <div className='empty-state'>
                        <h3>No recipes found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <RecipeItems recipes={filteredRecipes} />
                )}
            </div>
        </>
    )
}
