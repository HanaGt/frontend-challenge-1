"use client"

import { useState, useEffect } from "react"
import { SlidersHorizontal, BarChart3 } from "lucide-react"
import { TodoProvider } from "@/lib/todo-context"
import type { Todo, Category, Priority } from "@/lib/types"
import TodoHeader from "./todo-header"
import TodoInput from "./todo-input"
import TodoList from "./todo-list"
import TodoFilters from "./todo-filters"
import TodoStats from "./todo-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { defaultTodos, defaultCategories } from "@/lib/sample-data"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(false)

  // Load todos from localStorage on initial render
  useEffect(() => {
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
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  // Filter todos based on current filter
  const getFilteredTodos = () => {
    let filtered = [...todos]

    // Apply search filter
    if (search) {
      filtered = filtered.filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
    }

    // Apply status filter
    if (filter === "active") {
      filtered = filtered.filter((todo) => !todo.completed)
    } else if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed)
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((todo) => todo.categoryId === selectedCategory)
    }

    // Apply priority filter
    if (selectedPriority) {
      filtered = filtered.filter((todo) => todo.priority === selectedPriority)
    }

    return filtered
  }

  const addTodo = (text: string, dueDate?: Date, categoryId?: string, priority?: Priority) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      dueDate,
      categoryId,
      priority: priority || "medium",
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        categories,
        setCategories,
        clearCompleted,
      }}
    >
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Card className="shadow-lg border bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-8">
              <TodoHeader />
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <BarChart3 className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <TodoStats />
                  </DialogContent>
                </Dialog>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <TodoFilters
                      filter={filter}
                      setFilter={setFilter}
                      search={search}
                      setSearch={setSearch}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      selectedPriority={selectedPriority}
                      setSelectedPriority={setSelectedPriority}
                    />
                  </SheetContent>
                </Sheet>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <TodoInput />

            <Tabs defaultValue="all" className="mt-8" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <ScrollArea className="h-[50vh]">
                  <TodoList todos={getFilteredTodos()} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <ScrollArea className="h-[50vh]">
                  <TodoList todos={getFilteredTodos()} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <ScrollArea className="h-[50vh]">
                  <TodoList todos={getFilteredTodos()} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TodoProvider>
  )
}
