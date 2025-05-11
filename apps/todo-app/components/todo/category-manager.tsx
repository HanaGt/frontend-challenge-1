"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTodo } from "@/lib/todo-context"
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
import type { Category } from "@/lib/types"

export default function CategoryManager() {
  const { categories, setCategories } = useTodo()
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryColor, setNewCategoryColor] = useState("#6366f1")
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        color: newCategoryColor,
      }

      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setNewCategoryColor("#6366f1")
    }
  }

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((category) => category.id !== categoryToDelete))
      setCategoryToDelete(null)
    }
  }

  const categoryToDeleteName = categoryToDelete ? categories.find((c) => c.id === categoryToDelete)?.name : ""

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="New category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <div className="flex-shrink-0">
          <Input
            type="color"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
            className="w-10 h-10 p-1 cursor-pointer"
          />
        </div>
        <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {categories.length > 0 ? (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between py-2 px-3 border rounded">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span>{category.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCategoryToDelete(category.id)}
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No categories yet</p>
      )}

      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category "{categoryToDeleteName}"? Tasks assigned to this category
              will not be deleted, but they will no longer have a category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 focus:ring-red-600" onClick={handleDeleteCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
