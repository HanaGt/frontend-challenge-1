import { atom, selector } from "recoil"
import type { Todo, Category, Priority } from "@/lib/types"

// Todo list state
export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
})

// Filter state
export const todoFilterState = atom<string>({
  key: "todoFilterState",
  default: "all",
})

// Search state
export const todoSearchState = atom<string>({
  key: "todoSearchState",
  default: "",
})

// Category filter state
export const todoCategoryFilterState = atom<string | null>({
  key: "todoCategoryFilterState",
  default: null,
})

// Priority filter state
export const todoPriorityFilterState = atom<Priority | null>({
  key: "todoPriorityFilterState",
  default: null,
})

// Categories state
export const categoriesState = atom<Category[]>({
  key: "categoriesState",
  default: [],
})

// Filtered todo list selector
export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    try {
      const filter = get(todoFilterState)
      const todos = get(todoListState)
      const search = get(todoSearchState)
      const selectedCategory = get(todoCategoryFilterState)
      const selectedPriority = get(todoPriorityFilterState)

      let filteredTodos = [...todos]

      // Apply search filter
      if (search) {
        filteredTodos = filteredTodos.filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
      }

      // Apply status filter
      if (filter === "active") {
        filteredTodos = filteredTodos.filter((todo) => !todo.completed)
      } else if (filter === "completed") {
        filteredTodos = filteredTodos.filter((todo) => todo.completed)
      }

      // Apply category filter
      if (selectedCategory) {
        filteredTodos = filteredTodos.filter((todo) => todo.categoryId === selectedCategory)
      }

      // Apply priority filter
      if (selectedPriority) {
        filteredTodos = filteredTodos.filter((todo) => todo.priority === selectedPriority)
      }

      return filteredTodos
    } catch (error) {
      console.error("Error in filteredTodoListState:", error)
      return []
    }
  },
})
