"use client"
import { AnimatePresence } from "framer-motion"
import type { TodoItem } from "@/lib/types"
import TodoItemComponent from "./todo-item"
import { Button } from "@/components/ui/button"
import { useTodo } from "@/lib/todo-context"
import { CheckSquare2, Trash2 } from "lucide-react"

interface TodoListProps {
  todos: TodoItem[]
}

export default function TodoList({ todos }: TodoListProps) {
  const { clearCompleted } = useTodo()

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <CheckSquare2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
        <p className="text-muted-foreground mb-4">Add some tasks to get started with your day</p>
      </div>
    )
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="space-y-1 p-1">
      <AnimatePresence initial={false}>
        {todos.map((todo, index) => (
          <TodoItemComponent key={todo.id} todo={todo} index={index} />
        ))}
      </AnimatePresence>

      {completedCount > 0 && (
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={clearCompleted} className="text-muted-foreground text-xs">
            <Trash2 className="mr-2 h-3 w-3" />
            Clear completed ({completedCount})
          </Button>
        </div>
      )}
    </div>
  )
}
