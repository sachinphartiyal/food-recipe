import React from 'react'
import { Outlet } from 'react-router-dom' // used for nested routing
import Footer from './Footer'
import Navbar from './Navbar'

export default function MainNavigation() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  )
}
