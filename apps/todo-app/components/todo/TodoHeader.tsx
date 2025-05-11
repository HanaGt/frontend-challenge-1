"use client"

import { useState, useEffect } from "react"
import { HiSquare2Stack } from "react-icons/hi2"
import { FaMoon, FaSun } from "react-icons/fa"

export default function TodoHeader() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Check for user's preferred theme
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <HiSquare2Stack className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">TaskMaster</h1>
      <button
        onClick={toggleTheme}
        className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {theme === "dark" ? (
          <FaSun className="h-5 w-5 text-yellow-400" />
        ) : (
          <FaMoon className="h-5 w-5 text-gray-600" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  )
}
