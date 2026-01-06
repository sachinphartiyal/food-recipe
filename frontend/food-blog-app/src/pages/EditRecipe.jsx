import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    // runs once the component is mounted
    useEffect(() => {
        const getData = async () => {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/recipe/${id}`)
                .then(response => {
                    let res = response.data
                    setRecipeData({
                        title: res.title,
                        ingredients: res.ingredients.join(","),
                        instructions: res.instructions,
                        time: res.time,
                        category: res.category || '',
                        difficulty: res.difficulty || ''
                    })
                })
        }
        getData()
    }, [])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients")
            ? e.target.value.split(",")
            : (e.target.name === "file")
                ? e.target.files[0]
                : e.target.value

        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)

        await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/recipe/${id}`,
            recipeData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `bearer ${localStorage.getItem("token")}`
                }
            })
            .then(() => navigate("/myRecipe"))
    }
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>

                    <div className='form-control'>
                        <label>Title</label>
                        <input
                            type="text"
                            className='input'
                            name="title"
                            onChange={onHandleChange}
                            value={recipeData.title}>
                        </input>
                    </div>

                    <div className='form-control'>
                        <label>Time</label>
                        <input
                            type="text"
                            className='input'
                            name="time"
                            onChange={onHandleChange}
                            value={recipeData.time}
                            placeholder="e.g., 30 mins">
                        </input>
                    </div>

                    <div className='form-control'>
                        <label>Category</label>
                        <select
                            className='input'
                            name="category"
                            onChange={onHandleChange}
                            value={recipeData.category}>
                            <option value="">Select Category</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack">Snack</option>
                        </select>
                    </div>

                    <div className='form-control'>
                        <label>Difficulty</label>
                        <select
                            className='input'
                            name="difficulty"
                            onChange={onHandleChange}
                            value={recipeData.difficulty}>
                            <option value="">Select Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea
                            type="text"
                            className='input-textarea'
                            name="ingredients"
                            rows="5"
                            onChange={onHandleChange}
                            value={recipeData.ingredients}>
                        </textarea>
                    </div>

                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea
                            type="text"
                            className='input-textarea'
                            name="instructions"
                            rows="5"
                            onChange={onHandleChange}
                            value={recipeData.instructions}>
                        </textarea>
                    </div>

                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input
                            type="file"
                            className='input'
                            name="file"
                            onChange={onHandleChange}>
                        </input>
                    </div>

                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
    )
}
