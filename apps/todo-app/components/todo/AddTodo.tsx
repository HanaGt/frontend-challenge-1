"use client"

import type React from "react"

import { useState } from "react"
import { useTodoContext } from "./TodoApp"
import { FiPlusCircle, FiCalendar, FiTag, FiFlag } from "react-icons/fi"
import { format } from "date-fns"
import Calendar from "@/components/ui/Calendar"
import type { Priority } from "@/lib/types"

export default function AddTodo() {
  const { todos, setTodos, categories } = useTodoContext()

  const [text, setText] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState(false)
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
  const [showCategories, setShowCategories] = useState(false)
  const [priority, setPriority] = useState<Priority>("medium")
  const [showPriorities, setShowPriorities] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
        dueDate,
        categoryId,
        priority,
      }

      setTodos([newTodo, ...todos])
      setText("")
      setDueDate(undefined)
      setCategoryId(undefined)
      setPriority("medium")
    }
  }

  const priorityColors = {
    high: "text-red-500",
    medium: "text-amber-500",
    low: "text-emerald-500",
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full pl-4 pr-24 py-6 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <button
              type="button"
              onClick={() => {
                setShowCalendar(!showCalendar)
                setShowCategories(false)
                setShowPriorities(false)
              }}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 ${
                dueDate ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <FiCalendar className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowCategories(!showCategories)
                setShowCalendar(false)
                setShowPriorities(false)
              }}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 ${
                categoryId ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <FiTag className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowPriorities(!showPriorities)
                setShowCalendar(false)
                setShowCategories(false)
              }}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 ${priorityColors[priority]}`}
            >
              <FiFlag className="h-5 w-5" />
            </button>
          </div>

          {showCalendar && (
            <div className="absolute right-0 top-full mt-2 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <Calendar
                selected={dueDate}
                onSelect={(date) => {
                  setDueDate(date)
                  setShowCalendar(false)
                }}
              />
            </div>
          )}

          {showCategories && (
            <div className="absolute right-0 top-full mt-2 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64">
              <div className="p-2">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">Select category</div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCategoryId(undefined)
                      setShowCategories(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    None
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setCategoryId(category.id)
                        setShowCategories(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
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
            <div className="absolute right-0 top-full mt-2 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64">
              <div className="p-2">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">Set priority</div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setPriority("low")
                      setShowPriorities(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FiFlag className="h-4 w-4 text-emerald-500" />
                    <span>Low</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriority("medium")
                      setShowPriorities(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FiFlag className="h-4 w-4 text-amber-500" />
                    <span>Medium</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriority("high")
                      setShowPriorities(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FiFlag className="h-4 w-4 text-red-500" />
                    <span>High</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <FiPlusCircle className="h-5 w-5" />
          Add
        </button>
      </div>

      {(dueDate || categoryId) && (
        <div className="flex gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
          {dueDate && (
            <div className="flex items-center gap-1">
              <FiCalendar className="h-3 w-3" />
              {format(dueDate, "PPP")}
            </div>
          )}

          {categoryId && (
            <div className="flex items-center gap-1">
              <FiTag className="h-3 w-3" />
              {categories.find((c) => c.id === categoryId)?.name}
            </div>
          )}
        </div>
      )}
    </form>
  )
}
