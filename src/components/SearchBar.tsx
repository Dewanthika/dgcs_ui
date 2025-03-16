"use client"

import type React from "react"

import { Search } from "lucide-react"
import { useState } from "react"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
    // Implement search functionality
  }

  return (
    <div className=" py-5">
      <div className="container">
        <form onSubmit={handleSubmit} className="flex max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button type="submit" className=" text-white px-4 py-2 rounded-r-md">
            <Search size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar

