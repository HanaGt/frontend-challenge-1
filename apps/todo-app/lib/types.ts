export type Priority = "low" | "medium" | "high"

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  dueDate?: Date
  categoryId?: string
  priority: Priority
}

export interface Category {
  id: string
  name: string
  color: string
}

export type TodoItem = Todo
