"use client"

import { useState } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi"

interface CalendarProps {
  selected?: Date
  onSelect: (date: Date | undefined) => void
}

export default function Calendar({ selected, onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  // Get day names
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Calculate the day of the week for the first day of the month (0-6)
  const firstDayOfMonth = startOfMonth(currentMonth).getDay()

  // Create empty cells for days before the first day of the month
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <div className="p-3 w-64">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <FiChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-base font-medium text-gray-800 dark:text-white">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <FiChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="h-8"></div>
        ))}

        {days.map((day) => {
          const isSelectedDay = selected && isSameDay(day, selected)
          const isTodayDay = isToday(day)

          return (
            <button
              key={day.toString()}
              onClick={() => onSelect(day)}
              className={`
                h-8 w-8 flex items-center justify-center rounded-full text-sm
                ${isSelectedDay ? "bg-purple-600 text-white" : ""}
                ${!isSelectedDay && isTodayDay ? "border border-purple-600 text-purple-600 dark:text-purple-400" : ""}
                ${!isSelectedDay && !isTodayDay ? "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">{format(selected, "PPP")}</div>
          <button
            onClick={() => onSelect(undefined)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
