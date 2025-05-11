"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTodoContext } from "./TodoApp"
import { format } from "date-fns"
import { FiEdit2, FiTrash2, FiCalendar, FiTag, FiFlag, FiMoreHorizontal } from "react-icons/fi"
import Calendar from "@/components/ui/Calendar"
import type { Todo } from "@/lib/types"

interface TodoItemProps {
  todo: Todo
  index: number
}

export default function TodoItem({ todo, index }: TodoItemProps) {
  const { todos, setTodos, categories } = useTodoContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showPriorities, setShowPriorities] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const priorityColors = {
    high: "text-red-500",
    medium: "text-amber-500",
    low: "text-emerald-500",
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setShowCalendar(false)
        setShowCategories(false)
        setShowPriorities(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleComplete = () => {
    try {
      setTodos(todos.map((item) => (item.id === todo.id ? { ...item, completed: !item.completed } : item)))
    } catch (error) {
      console.error("Error toggling complete:", error)
    }
  }

  const updateTodo = (updatedTodo: Todo) => {
    try {
      setTodos(todos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)))
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }

  const deleteTodo = () => {
    try {
      setTodos(todos.filter((item) => item.id !== todo.id))
      setShowDeleteConfirm(false)
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      updateTodo({ ...todo, text: editText })
    }
    setIsEditing(!isEditing)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit()
    }
  }

  const handleUpdateDueDate = (date: Date | undefined) => {
    updateTodo({ ...todo, dueDate: date })
    setShowCalendar(false)
  }

  const handleUpdateCategory = (categoryId: string | undefined) => {
    updateTodo({ ...todo, categoryId })
    setShowCategories(false)
  }

  const handleUpdatePriority = (priority: Todo["priority"]) => {
    updateTodo({ ...todo, priority })
    setShowPriorities(false)
  }

  const category = todo.categoryId ? categories.find((c) => c.id === todo.categoryId) : null

  // Format date safely
  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    try {
      return format(new Date(date), "MMM d")
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg mb-2 group hover:shadow-md transition-all ${
        todo.completed ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"
      }`}
      style={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: `all 0.2s ease-in-out ${index * 0.05}s`,
      }}
    >
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          id={`todo-${todo.id}`}
          className="h-5 w-5 rounded-full border-2 border-purple-500 text-purple-600 focus:ring-purple-500 cursor-pointer"
        />
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleInputKeyDown}
            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`text-lg cursor-pointer truncate ${
              todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-white"
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </label>
        )}

        {(todo.dueDate || todo.categoryId || todo.priority) && (
          <div className="flex flex-wrap gap-2 mt-1">
            {todo.dueDate && (
              <span
                className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${
                  new Date(todo.dueDate) < new Date() && !todo.completed
                    ? "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiCalendar className="h-3 w-3" />
                {formatDate(todo.dueDate)}
              </span>
            )}

            {todo.categoryId && category && (
              <span
                className="text-xs px-2 py-1 rounded-full border flex items-center gap-1"
                style={{
                  borderColor: category.color,
                  backgroundColor: `${category.color}20`,
                  color: category.color,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
                {category.name}
              </span>
            )}

            {todo.priority && (
              <span
                className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${
                  todo.priority === "high"
                    ? "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
                    : todo.priority === "medium"
                      ? "bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
                      : "bg-emerald-100 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                }`}
              >
                <FiFlag className="h-3 w-3" />
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiMoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48">
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setShowDropdown(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <FiEdit2 className="mr-2 h-4 w-4" />
                  Edit
                </button>

                <hr className="my-1 border-gray-200 dark:border-gray-700" />

                <button
                  onClick={() => {
                    setShowCalendar(!showCalendar)
                    setShowCategories(false)
                    setShowPriorities(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <FiCalendar className="mr-2 h-4 w-4" />
                  Set due date
                </button>

                <button
                  onClick={() => {
                    setShowCategories(!showCategories)
                    setShowCalendar(false)
                    setShowPriorities(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <FiTag className="mr-2 h-4 w-4" />
                  Set category
                </button>

                <button
                  onClick={() => {
                    setShowPriorities(!showPriorities)
                    setShowCalendar(false)
                    setShowCategories(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <FiFlag className="mr-2 h-4 w-4" />
                  Set priority
                </button>

                <hr className="my-1 border-gray-200 dark:border-gray-700" />

                <button
                  onClick={() => {
                    setShowDeleteConfirm(true)
                    setShowDropdown(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                >
                  <FiTrash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>

              {showCalendar && (
                <div className="absolute right-full mr-2 top-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <Calendar
                    selected={todo.dueDate ? new Date(todo.dueDate) : undefined}
                    onSelect={handleUpdateDueDate}
                  />
                </div>
              )}

              {showCategories && (
                <div className="absolute right-full mr-2 top-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48">
                  <div className="p-2">
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">Select category</div>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleUpdateCategory(undefined)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        None
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleUpdateCategory(category.id)}
                          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showPriorities && (
                <div className="absolute right-full mr-2 top-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48">
                  <div className="p-2">
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">Set priority</div>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleUpdatePriority("low")}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                      >
                        <FiFlag className="h-4 w-4 text-emerald-500" />
                        <span>Low</span>
                      </button>
                      <button
                        onClick={() => handleUpdatePriority("medium")}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                      >
                        <FiFlag className="h-4 w-4 text-amber-500" />
                        <span>Medium</span>
                      </button>
                      <button
                        onClick={() => handleUpdatePriority("high")}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                      >
                        <FiFlag className="h-4 w-4 text-red-500" />
                        <span>High</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Are you sure?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              This will permanently delete this task. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteTodo}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
