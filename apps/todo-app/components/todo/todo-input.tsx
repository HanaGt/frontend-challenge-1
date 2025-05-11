"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { PlusCircle, Calendar, Tag, Flag } from "lucide-react"
import { useTodo } from "@/lib/todo-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Priority } from "@/lib/types"

export default function TodoInput() {
  const { addTodo, categories } = useTodo()
  const [text, setText] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
  const [priority, setPriority] = useState<Priority>("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text.trim(), dueDate, categoryId, priority)
      setText("")
      setDueDate(undefined)
      setCategoryId(undefined)
      setPriority("medium")
    }
  }

  const priorityColors = {
    high: "text-red-500",
    medium: "text-amber-500",
    low: "text-emerald-500",
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="pr-24 pl-4 py-6 text-lg border border-input"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" type="button" className={cn(dueDate && "text-primary")}>
                  <Calendar className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" type="button" className={cn(categoryId && "text-primary")}>
                  <Tag className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end">
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" type="button" className={priorityColors[priority]}>
                  <Flag className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end">
                <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Set priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-emerald-500" />
                        Low
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-amber-500" />
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-red-500" />
                        High
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit" size="lg" className="h-auto">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add
        </Button>
      </div>

      {(dueDate || categoryId) && (
        <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
          {dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(dueDate, "PPP")}
            </div>
          )}

          {categoryId && (
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {categories.find((c) => c.id === categoryId)?.name}
            </div>
          )}
        </div>
      )}
    </form>
  )
}
