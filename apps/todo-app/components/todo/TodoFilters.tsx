"use client"

import { useState } from "react"
import { useTodoContext } from "./TodoApp"
import { FiSearch, FiX, FiPlus } from "react-icons/fi"
import type { Priority } from "@/lib/types"

export default function TodoFilters() {
  const {
    filter,
    setFilter,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    categories,
    setCategories,
  } = useTodoContext()

  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryColor, setNewCategoryColor] = useState("#6366f1")

  const handleClearFilters = () => {
    setSearch("")
    setSelectedCategory(null)
    setSelectedPriority(null)
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        color: newCategoryColor,
      }

      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setNewCategoryColor("#6366f1")
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
    if (selectedCategory === id) {
      setSelectedCategory(null)
    }
  }

  const isFiltering = search || selectedCategory || selectedPriority

  return (
    <div className="pt-2">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Filters</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
              <select
                value={selectedPriority || ""}
                onChange={(e) => setSelectedPriority((e.target.value as Priority) || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">Any priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {isFiltering && (
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                onClick={handleClearFilters}
              >
                <FiX className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span>Manage Categories</span>
            <span
              className="transform transition-transform duration-200"
              style={{
                transform: showCategoryManager ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          </button>

          {showCategoryManager && (
            <div className="mt-4 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New category"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="w-10 h-10 p-1 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                />
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus className="h-5 w-5" />
                </button>
              </div>

              {categories.length > 0 ? (
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="flex items-center justify-between py-2 px-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <span className="text-gray-800 dark:text-white">{category.name}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No categories yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
