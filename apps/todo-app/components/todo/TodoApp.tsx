"use client"

import type React from "react"

import { useEffect, useState, createContext, useContext } from "react"
import { defaultTodos, defaultCategories } from "@/lib/sample-data"
import TodoHeader from "./TodoHeader"
import AddTodo from "./AddTodo"
import TodoList from "./TodoList"
import TodoFilters from "./TodoFilters"
import TodoStats from "./TodoStats"
import { HiChartBar, HiAdjustmentsHorizontal } from "react-icons/hi2"
import type { Todo, Category, Priority } from "@/lib/types"

// Create context for todo state
type TodoContextType = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  filter: string
  setFilter: (filter: string) => void
  search: string
  setSearch: (search: string) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  selectedPriority: Priority | null
  setSelectedPriority: (priority: Priority | null) => void
  filteredTodos: Todo[]
}

const TodoContext = createContext<TodoContextType | null>(null)

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider")
  }
  return context
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Calculate filtered todos
  const filteredTodos = todos.filter((todo) => {
    // Apply search filter
    if (search && !todo.text.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    // Apply status filter
    if (filter === "active" && todo.completed) {
      return false
    }
    if (filter === "completed" && !todo.completed) {
      return false
    }

    // Apply category filter
    if (selectedCategory && todo.categoryId !== selectedCategory) {
      return false
    }

    // Apply priority filter
    if (selectedPriority && todo.priority !== selectedPriority) {
      return false
    }

    return true
  })

  // Load todos from localStorage on initial render
  useEffect(() => {
    try {
      setIsLoading(true)
      const savedTodos = localStorage.getItem("todos")
      const savedCategories = localStorage.getItem("categories")

      if (savedTodos) {
        setTodos(JSON.parse(savedTodos))
      } else {
        setTodos(defaultTodos)
      }

      if (savedCategories) {
        setCategories(JSON.parse(savedCategories))
      } else {
        setCategories(defaultCategories)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      // Fallback to defaults if there's an error
      setTodos(defaultTodos)
      setCategories(defaultCategories)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("todos", JSON.stringify(todos))
      } catch (error) {
        console.error("Error saving todos:", error)
      }
    }
  }, [todos, isLoading])

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("categories", JSON.stringify(categories))
      } catch (error) {
        console.error("Error saving categories:", error)
      }
    }
  }, [categories, isLoading])

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        categories,
        setCategories,
        filter,
        setFilter,
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        selectedPriority,
        setSelectedPriority,
        filteredTodos,
      }}
    >
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <TodoHeader />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <HiChartBar className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <HiAdjustmentsHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200">
                  U
                </div>
              </div>
            </div>

            <AddTodo />

            <div className="mt-8">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 font-medium text-sm ${
                    filter === "all"
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 font-medium text-sm ${
                    filter === "active"
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 font-medium text-sm ${
                    filter === "completed"
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Completed
                </button>
              </div>

              <div className="flex gap-4">
                <div className={`flex-1 ${showFilters ? "w-3/4" : "w-full"}`}>
                  <div className="h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    <TodoList clearCompleted={clearCompleted} />
                  </div>
                </div>

                {showFilters && (
                  <div className="w-1/4 border-l border-gray-200 dark:border-gray-700 pl-4">
                    <TodoFilters />
                  </div>
                )}
              </div>
            </div>

            {showStats && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <TodoStats />
              </div>
            )}
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  )
}
