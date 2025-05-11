"use client"

import { useMemo } from "react"
import { useTodoContext } from "./TodoApp"
import { HiSquare2Stack, HiClock, HiChartBar } from "react-icons/hi2"
import { BsSquare } from "react-icons/bs"
import { FiCalendar, FiList } from "react-icons/fi"

export default function TodoStats() {
  const { todos, categories } = useTodoContext()

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    const active = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    // Calculate tasks by priority
    const byPriority = {
      high: todos.filter((todo) => todo.priority === "high").length,
      medium: todos.filter((todo) => todo.priority === "medium").length,
      low: todos.filter((todo) => todo.priority === "low").length,
    }

    // Calculate tasks by category
    const byCategory = categories
      .map((category) => ({
        id: category.id,
        name: category.name,
        color: category.color,
        count: todos.filter((todo) => todo.categoryId === category.id).length,
      }))
      .filter((c) => c.count > 0)

    // Calculate overdue tasks
    const overdue = todos.filter(
      (todo) => todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed,
    ).length

    return {
      total,
      completed,
      active,
      completionRate,
      byPriority,
      byCategory,
      overdue,
    }
  }, [todos, categories])

  return (
    <div className="space-y-6">
      <div className="pb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
          <HiChartBar className="mr-2 h-6 w-6 text-purple-600 dark:text-purple-400" />
          Task Statistics
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Overview of your task management</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <FiList className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <HiSquare2Stack className="h-10 w-10 text-emerald-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.completed}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <BsSquare className="h-10 w-10 text-amber-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.active}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <FiCalendar className="h-10 w-10 text-red-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.overdue}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Completion Rate</h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-purple-600 dark:bg-purple-500 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
        <p className="text-center text-sm font-medium text-gray-800 dark:text-white">{stats.completionRate}%</p>
      </div>

      {stats.byCategory.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Tasks by Category</h3>
          <div className="space-y-2">
            {stats.byCategory.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-gray-800 dark:text-white">{category.name}</span>
                </div>
                <span className="font-medium text-gray-800 dark:text-white">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Tasks by Priority</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiClock className="h-4 w-4 text-red-500" />
              <span className="text-gray-800 dark:text-white">High</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{stats.byPriority.high}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiClock className="h-4 w-4 text-amber-500" />
              <span className="text-gray-800 dark:text-white">Medium</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{stats.byPriority.medium}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiClock className="h-4 w-4 text-emerald-500" />
              <span className="text-gray-800 dark:text-white">Low</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{stats.byPriority.low}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
