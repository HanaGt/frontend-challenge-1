"use client"

import type React from "react"

import { createContext, useContext } from "react"
import type { Todo, Category } from "./types"

interface TodoContextType {
  todos: Todo[]
  addTodo: (text: string, dueDate?: Date, categoryId?: string, priority?: Todo["priority"]) => void
  updateTodo: (updatedTodo: Todo) => void
  deleteTodo: (id: string) => void
  toggleComplete: (id: string) => void
  categories: Category[]
  setCategories: (categories: Category[]) => void
  clearCompleted: () => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function useTodo() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider")
  }
  return context
}

interface TodoProviderProps {
  children: React.ReactNode
  value: TodoContextType
}

export function TodoProvider({ children, value }: TodoProviderProps) {
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
