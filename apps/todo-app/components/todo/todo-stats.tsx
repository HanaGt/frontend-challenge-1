"use client"

import { useMemo } from "react"
import { useTodo } from "@/lib/todo-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Clock, Square, BarChart, CalendarClock, ListTodo } from "lucide-react"

export default function TodoStats() {
  const { todos, categories } = useTodo()

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
      <CardHeader className="p-0 pb-6">
        <CardTitle className="text-2xl flex items-center">
          <BarChart className="mr-2 h-6 w-6" />
          Task Statistics
        </CardTitle>
        <CardDescription>Overview of your task management</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <ListTodo className="h-10 w-10 text-primary mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <CheckSquare className="h-10 w-10 text-emerald-500 mb-2" />
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Square className="h-10 w-10 text-amber-500 mb-2" />
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <CalendarClock className="h-10 w-10 text-red-500 mb-2" />
            <div className="text-2xl font-bold">{stats.overdue}</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Completion Rate</h3>
        <div className="w-full bg-muted rounded-full h-4">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
        <p className="text-center text-sm font-medium">{stats.completionRate}%</p>
      </div>

      {stats.byCategory.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tasks by Category</h3>
          <div className="space-y-2">
            {stats.byCategory.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span>{category.name}</span>
                </div>
                <span className="font-medium">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tasks by Priority</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 text-red-500">
                <Clock className="h-3 w-3" />
              </div>
              <span>High</span>
            </div>
            <span className="font-medium">{stats.byPriority.high}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 text-amber-500">
                <Clock className="h-3 w-3" />
              </div>
              <span>Medium</span>
            </div>
            <span className="font-medium">{stats.byPriority.medium}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 text-emerald-500">
                <Clock className="h-3 w-3" />
              </div>
              <span>Low</span>
            </div>
            <span className="font-medium">{stats.byPriority.low}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
