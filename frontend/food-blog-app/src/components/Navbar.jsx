import React, { useEffect, useState } from 'react'
import Modal from './Modal' // popup window
import InputForm from './InputForm' // login/signup form
import { NavLink } from 'react-router-dom' // navigation links (with active styling)

export default function Navbar() {
  // to show login modal
  const [isOpen, setIsOpen] = useState(false)

  // Gets JWT token from browser
  // Token exists → user logged in
  let token = localStorage.getItem("token")

  // to check if login required
  const [isLoginRequired, setIsLoginRequired] = useState(token ? false : true)

  // JSON.parse converts string → object
  let user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    setIsLoginRequired(token ? false : true)
  }, [token])


  const checkLogin = () => {
    // user clicks logout
    if (token) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLoginRequired(true) // ui switches to login mode
    }
    else {
      // user clicks login
      setIsOpen(true)
    }
  }

  return (
    <>
      <header>
        <h2>PhartiyalJi Food Blog</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {/* if login is required then show login modal */}
          <li onClick={() => isLoginRequired && setIsOpen(true)}>
            <NavLink to={!isLoginRequired ? "/myRecipe" : "/"}>
              My Recipe
            </NavLink>
          </li>

          <li onClick={() => isLoginRequired && setIsOpen(true)}>
            <NavLink to={!isLoginRequired ? "/favRecipe" : "/"}>
              Favourites
            </NavLink>
          </li>

          <li onClick={checkLogin}>
            <p className='login'>
              {(isLoginRequired) ? "Login" : "Logout"}
              {user?.email ? `(${user?.email})` : ""}
            </p>
          </li>

        </ul>
      </header>

      {(isOpen) &&
        <Modal
          onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      }
    </>
  )
}
