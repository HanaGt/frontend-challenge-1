"use client"

import { useTodo } from "@/lib/todo-context"
import type { Priority } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, Search, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import CategoryManager from "./category-manager"

interface TodoFiltersProps {
  filter: string
  setFilter: (filter: string) => void
  search: string
  setSearch: (search: string) => void
  selectedCategory: string | null
  setSelectedCategory: (categoryId: string | null) => void
  selectedPriority: Priority | null
  setSelectedPriority: (priority: Priority | null) => void
}

export default function TodoFilters({
  filter,
  setFilter,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
}: TodoFiltersProps) {
  const { categories } = useTodo()

  const handleClearFilters = () => {
    setSearch("")
    setSelectedCategory(null)
    setSelectedPriority(null)
  }

  const isFiltering = search || selectedCategory || selectedPriority

  return (
    <div className="pt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Filters</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
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
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={selectedPriority || ""}
                onValueChange={(value) => setSelectedPriority((value as Priority) || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any priority</SelectItem>
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
            </div>

            {isFiltering && (
              <Button variant="outline" className="w-full" onClick={handleClearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="categories">
            <AccordionTrigger>Manage Categories</AccordionTrigger>
            <AccordionContent>
              <CategoryManager />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
