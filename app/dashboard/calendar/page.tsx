"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Plus, Clock, Users, CalendarIcon } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const tasks = [
    {
      id: 1,
      title: "Team standup meeting",
      date: new Date(),
      time: "09:00",
      duration: "30 min",
      type: "meeting",
      assignee: "John Doe",
      priority: "Medium",
    },
    {
      id: 2,
      title: "Code review session",
      date: addDays(new Date(), 1),
      time: "14:00",
      duration: "1 hour",
      type: "review",
      assignee: "Jane Smith",
      priority: "High",
    },
    {
      id: 3,
      title: "Project deadline",
      date: addDays(new Date(), 3),
      time: "17:00",
      duration: "All day",
      type: "deadline",
      assignee: "Mike Johnson",
      priority: "High",
    },
    {
      id: 4,
      title: "Client presentation",
      date: addDays(new Date(), 5),
      time: "10:00",
      duration: "2 hours",
      type: "presentation",
      assignee: "Sarah Wilson",
      priority: "High",
    },
  ]

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => format(task.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "presentation":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate || new Date()),
    end: endOfWeek(selectedDate || new Date()),
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-300">View and manage your team's schedule and deadlines</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-lg">
            <Button variant={view === "month" ? "default" : "ghost"} size="sm" onClick={() => setView("month")}>
              Month
            </Button>
            <Button variant={view === "week" ? "default" : "ghost"} size="sm" onClick={() => setView("week")}>
              Week
            </Button>
            <Button variant={view === "day" ? "default" : "ghost"} size="sm" onClick={() => setView("day")}>
              Day
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{format(selectedDate || new Date(), "MMMM yyyy")}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {view === "month" && (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              )}

              {view === "week" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => (
                      <div key={day.toISOString()} className="p-2 border rounded-lg min-h-32">
                        <div className="font-medium text-sm mb-2">{format(day, "EEE d")}</div>
                        <div className="space-y-1">
                          {getTasksForDate(day).map((task) => (
                            <div key={task.id} className="text-xs p-1 bg-blue-100 dark:bg-blue-900 rounded">
                              <p className="font-medium truncate">{task.title}</p>
                              <p className="text-gray-600 dark:text-gray-300">{task.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "day" && selectedDate && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
                  <div className="space-y-2">
                    {getTasksForDate(selectedDate).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{task.title}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <Clock className="h-3 w-3" />
                            <span>
                              {task.time} - {task.duration}
                            </span>
                            <Users className="h-3 w-3 ml-2" />
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getTypeColor(task.type)}>{task.type}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.slice(0, 4).map((task) => (
                <div key={task.id} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{task.title}</p>
                    <Badge className={getTypeColor(task.type)} variant="secondary">
                      {task.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{format(task.date, "MMM d")}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{task.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{task.assignee}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Events</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Meetings</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Deadlines</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Reviews</span>
                <span className="font-medium">4</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
