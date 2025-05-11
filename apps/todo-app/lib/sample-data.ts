import type { Todo, Category } from "./types"

// Create a function to safely create dates
const createDate = (daysOffset: number): Date => {
  try {
    return new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1000)
  } catch (error) {
    return new Date()
  }
}

export const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Work",
    color: "#ef4444",
  },
  {
    id: "cat-2",
    name: "Personal",
    color: "#3b82f6",
  },
  {
    id: "cat-3",
    name: "Shopping",
    color: "#f59e0b",
  },
  {
    id: "cat-4",
    name: "Health",
    color: "#10b981",
  },
]

export const defaultTodos: Todo[] = [
  {
    id: "1",
    text: "Complete project proposal",
    completed: false,
    createdAt: new Date(),
    dueDate: createDate(2), // 2 days from now
    categoryId: "cat-1",
    priority: "high",
  },
  {
    id: "2",
    text: "Go grocery shopping",
    completed: false,
    createdAt: new Date(),
    categoryId: "cat-3",
    priority: "medium",
  },
  {
    id: "3",
    text: "Schedule doctor appointment",
    completed: false,
    createdAt: new Date(),
    dueDate: createDate(7), // 7 days from now
    categoryId: "cat-4",
    priority: "medium",
  },
  {
    id: "4",
    text: "Read a chapter of your book",
    completed: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    categoryId: "cat-2",
    priority: "low",
  },
  {
    id: "5",
    text: "Call mom",
    completed: false,
    createdAt: new Date(),
    categoryId: "cat-2",
    priority: "high",
  },
]
