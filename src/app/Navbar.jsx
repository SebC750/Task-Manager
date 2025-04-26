'use client'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar justify-between px-10 shadow-lg">
       <h1 className="text-accent font-bold text-4xl"> TODO </h1>
       <button className="btn btn-accent" onClick={() => document.getElementById("newTask").showModal()}> <i className="bi bi-plus text-3xl font-bold"> </i>New task </button>
    </nav>
  )
}

export default Navbar