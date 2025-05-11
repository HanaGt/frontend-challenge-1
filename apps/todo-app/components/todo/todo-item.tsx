"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { useTodo } from "@/lib/todo-context"
import type { Todo } from "@/lib/types"
import { Pencil, Trash2, Calendar, Tag, Flag, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TodoItemProps {
  todo: Todo
  index: number
}

export default function TodoItem({ todo, index }: TodoItemProps) {
  const { toggleComplete, updateTodo, deleteTodo, categories } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const priorityColors = {
    high: "text-red-500",
    medium: "text-amber-500",
    low: "text-emerald-500",
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleToggleComplete = () => {
    toggleComplete(todo.id)
  }

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      updateTodo({ ...todo, text: editText })
    }
    setIsEditing(!isEditing)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit()
    }
  }

  const handleUpdateDueDate = (date: Date | undefined) => {
    updateTodo({ ...todo, dueDate: date })
  }

  const handleUpdateCategory = (categoryId: string) => {
    updateTodo({ ...todo, categoryId })
  }

  const handleUpdatePriority = (priority: string) => {
    updateTodo({ ...todo, priority: priority as Todo["priority"] })
  }

  const category = todo.categoryId ? categories.find((c) => c.id === todo.categoryId) : null

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "flex items-center gap-3 p-3 border rounded-lg mb-2 group hover:shadow-md transition-all",
        todo.completed && "bg-muted/50",
      )}
    >
      <div className="flex-shrink-0">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          id={`todo-${todo.id}`}
          className="pointer-events-auto"
        />
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleInputKeyDown}
            className="w-full"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={cn("text-lg cursor-pointer truncate", todo.completed && "line-through text-muted-foreground")}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </label>
        )}

        {(todo.dueDate || todo.categoryId || todo.priority) && (
          <div className="flex flex-wrap gap-2 mt-1">
            {todo.dueDate && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs flex items-center gap-1",
                  new Date(todo.dueDate) < new Date() && !todo.completed && "bg-red-100 dark:bg-red-900/20",
                )}
              >
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.dueDate), "MMM d")}
              </Badge>
            )}

            {todo.categoryId && category && (
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1"
                style={{
                  borderColor: category.color,
                  backgroundColor: `${category.color}20`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
                {category.name}
              </Badge>
            )}

            {todo.priority && (
              <Badge variant="outline" className={cn("text-xs flex items-center gap-1", priorityColors[todo.priority])}>
                <Flag className="h-3 w-3" />
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Popover>
                <PopoverTrigger className="flex items-center w-full justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Set due date
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="single"
                    selected={todo.dueDate ? new Date(todo.dueDate) : undefined}
                    onSelect={handleUpdateDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Popover>
                <PopoverTrigger className="flex items-center w-full justify-between">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    Set category
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                  <Select value={todo.categoryId || ""} onValueChange={handleUpdateCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PopoverContent>
              </Popover>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Popover>
                <PopoverTrigger className="flex items-center w-full justify-between">
                  <div className="flex items-center">
                    <Flag className="mr-2 h-4 w-4" />
                    Set priority
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                  <Select value={todo.priority} onValueChange={handleUpdatePriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Set priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lowValue">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-emerald-500" />
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="mediumValue">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-amber-500" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="highValue">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-red-500" />
                          High
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </PopoverContent>
              </Popover>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this task. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 focus:ring-red-600" onClick={() => deleteTodo(todo.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.li>
  )
}
