"use client"

import TodoItem from "./TodoItem"
import { HiSquare2Stack } from "react-icons/hi2"
import { FiTrash2 } from "react-icons/fi"
import { useTodoContext } from "./TodoApp"

interface TodoListProps {
  clearCompleted: () => void
}

export default function TodoList({ clearCompleted }: TodoListProps) {
  const { filteredTodos } = useTodoContext()

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <HiSquare2Stack className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No tasks yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Add some tasks to get started with your day</p>
      </div>
    )
  }

  const completedCount = filteredTodos.filter((todo) => todo.completed).length

  return (
    <div className="space-y-1">
      {filteredTodos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
      ))}

      {completedCount > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={clearCompleted}
            className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiTrash2 className="h-3 w-3" />
            Clear completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  )
}
