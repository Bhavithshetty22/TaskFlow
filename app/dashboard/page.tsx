"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])

  const stats = [
    {
      title: "Total Tasks",
      value: 142,
      change: "+12%",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Completed",
      value: 89,
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "In Progress",
      value: 31,
      change: "+5%",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      title: "Overdue",
      value: 22,
      change: "-3%",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ]

  useEffect(() => {
    setMounted(true)

    // Animate stats on mount
    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.value / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev]
          newStats[index] = Math.floor(current)
          return newStats
        })
      }, 30)
    })
  }, [])

  const recentTasks = [
    {
      id: 1,
      title: "Implement user authentication",
      assignee: "John Doe",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-15",
      progress: 65,
    },
    {
      id: 2,
      title: "Design dashboard mockups",
      assignee: "Jane Smith",
      priority: "Medium",
      status: "Completed",
      dueDate: "2024-01-12",
      progress: 100,
    },
    {
      id: 3,
      title: "Database optimization",
      assignee: "Mike Johnson",
      priority: "High",
      status: "Todo",
      dueDate: "2024-01-18",
      progress: 0,
    },
    {
      id: 4,
      title: "API documentation",
      assignee: "Sarah Wilson",
      priority: "Low",
      status: "Overdue",
      dueDate: "2024-01-10",
      progress: 30,
    },
  ]

  const teamMembers = [
    { name: "John Doe", role: "Admin", tasks: 12, avatar: "JD", efficiency: 92 },
    { name: "Jane Smith", role: "Manager", tasks: 8, avatar: "JS", efficiency: 88 },
    { name: "Mike Johnson", role: "Member", tasks: 15, avatar: "MJ", efficiency: 95 },
    { name: "Sarah Wilson", role: "Member", tasks: 6, avatar: "SW", efficiency: 85 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Todo":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
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

  if (!mounted) return null

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 mb-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Good morning, John! 👋</h1>
                  <p className="text-blue-100">Ready to tackle today's challenges?</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-blue-100">Tasks Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-blue-100">Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-blue-100">Productivity</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center floating-animation">
                <BarChart3 className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Welcome back! Here's what's happening with your organization.
          </p>
        </div>
        <Link href="/dashboard/tasks">
          <Button className="premium-button">
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="premium-card hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{animatedStats[index]}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.change.startsWith("+") ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                )}
                <span className="text-green-600 font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <Card className="premium-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Recent Tasks</CardTitle>
                <CardDescription>Latest task updates in your organization</CardDescription>
              </div>
              <Link href="/dashboard/tasks">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Overview */}
        <Card className="premium-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Team Overview</CardTitle>
                <CardDescription>Active team members and their performance</CardDescription>
              </div>
              <Link href="/dashboard/team">
                <Button variant="outline" size="sm">
                  Manage Team
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium text-gray-900 dark:text-white">{member.tasks} tasks</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={member.efficiency} className="w-16 h-2" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{member.efficiency}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Categories */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-xl">Task Distribution by Category</CardTitle>
          <CardDescription>Overview of tasks across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Bug Fixes", tasks: 45, total: 65, color: "bg-red-500" },
              { name: "Features", tasks: 67, total: 80, color: "bg-blue-500" },
              { name: "Improvements", tasks: 30, total: 45, color: "bg-green-500" },
            ].map((category, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {category.tasks}/{category.total} tasks
                  </span>
                </div>
                <Progress value={(category.tasks / category.total) * 100} className="h-3" />
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {Math.round((category.tasks / category.total) * 100)}% completion rate
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
