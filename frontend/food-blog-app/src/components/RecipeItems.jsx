import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

import foodImg from '../assets/foodRecipe.png'

import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from 'axios';

export default function RecipeItems() {
    // This function fetches data before the page loads.
    const recipes = useLoaderData()

    const [allRecipes, setAllRecipes] = useState()

    let path = window.location.pathname === "/myRecipe" ? true : false

    // get favourite items from local storage
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []

    const [isFavRecipe, setIsFavRecipe] = useState(false)

    const navigate = useNavigate()
    // console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

    // delete recipe logic
    const onDelete = async (id) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/recipe/${id}`, {
            headers: {
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        })
            .then((res) => console.log(res))

        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))

        let filterItem = favItems.filter(recipe => recipe._id !== id)
        localStorage.setItem("fav", JSON.stringify(filterItem))
    }

    // favourite recipe logic
    const favRecipe = (item) => {
        // Removes item if already favourite
        let filterItem = favItems.filter(recipe => recipe._id !== item._id)

        // find the item in favItems array
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0
            ? [...favItems, item]
            : filterItem

        localStorage.setItem("fav", JSON.stringify(favItems))

        // setIsFavRecipe forces re-render to update heart color
        setIsFavRecipe(pre => !pre)
    }

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            // Recipe Card
                            < div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.coverImage}`} width="120px" height="100px"></img>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>

                                        <div className='timer'>
                                            <BsStopwatchFill />
                                            {item.time}
                                        </div>

                                        {(!path)
                                            ?
                                            <FaHeart
                                                onClick={() => favRecipe(item)}
                                                style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }}
                                            />
                                            :
                                            <div className='action'>
                                                <Link
                                                    to={`/editRecipe/${item._id}`}
                                                    className="editIcon"><FaEdit />
                                                </Link>

                                                <MdDelete
                                                    onClick={() => onDelete(item._id)}
                                                    className='deleteIcon'
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}
