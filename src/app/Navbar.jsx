'use client'
import React from 'react'
import Image from 'next/image'
import ClipBoard from "../../public/favicon.png"
const Navbar = () => {
  return (
    <nav className="navbar justify-between px-10 shadow-lg">
      <div className="flex items-center gap-4">
        <Image src={ClipBoard} alt={"Task manager navbar logo"} height={50} width={50} />
        <h1 className="text-accent font-bold text-4xl"> Task Manager </h1>
      </div>
      <button className="btn btn-accent" onClick={() => document.getElementById("newTask").showModal()}> <i className="bi bi-plus text-3xl font-bold"> </i>New task </button>
    </nav>
  )
}

export default Navbar