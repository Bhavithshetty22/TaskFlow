"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, CheckCircle, Clock, AlertTriangle, Target } from "lucide-react"

export default function AnalyticsPage() {
  const performanceMetrics = [
    {
      title: "Task Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Average Task Duration",
      value: "3.2 days",
      change: "-0.5 days",
      trend: "down",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Team Productivity",
      value: "92%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Overdue Tasks",
      value: "12",
      change: "-3",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const teamPerformance = [
    { name: "John Doe", completed: 24, assigned: 28, efficiency: 86 },
    { name: "Jane Smith", completed: 18, assigned: 20, efficiency: 90 },
    { name: "Mike Johnson", completed: 32, assigned: 35, efficiency: 91 },
    { name: "Sarah Wilson", completed: 15, assigned: 18, efficiency: 83 },
    { name: "Alex Brown", completed: 21, assigned: 25, efficiency: 84 },
  ]

  const categoryStats = [
    { category: "Bug Fixes", completed: 45, total: 52, percentage: 87 },
    { category: "Features", completed: 28, total: 35, percentage: 80 },
    { category: "Improvements", completed: 16, total: 18, percentage: 89 },
    { category: "Documentation", completed: 12, total: 15, percentage: 80 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Insights into your organization's performance and productivity
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                )}
                <span className="text-green-600">{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Current status of all tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>89 tasks (62%)</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>In Progress</span>
                    <span>31 tasks (22%)</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Todo</span>
                    <span>22 tasks (15%)</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overdue</span>
                    <span>12 tasks (8%)</span>
                  </div>
                  <Progress value={8} className="h-2 bg-red-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Breakdown</CardTitle>
                <CardDescription>Tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>High Priority</span>
                    <span>28 tasks</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medium Priority</span>
                    <span>67 tasks</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Low Priority</span>
                    <span>47 tasks</span>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Individual team member productivity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {member.completed}/{member.assigned} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{member.efficiency}% efficiency</p>
                      <Progress value={member.efficiency} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Task completion rates by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{category.category}</h4>
                      <Badge variant="secondary">
                        {category.completed}/{category.total} completed
                      </Badge>
                    </div>
                    <Progress value={category.percentage} className="h-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">{category.percentage}% completion rate</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Task completion over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["January", "February", "March", "April", "May", "June"].map((month, index) => {
                    const values = [65, 72, 68, 85, 78, 92]
                    return (
                      <div key={month} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{month}</span>
                          <span>{values[index]}% completion</span>
                        </div>
                        <Progress value={values[index]} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Important trends and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Productivity Increase</p>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Team productivity has increased by 15% this month
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-300">Goal Achievement</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">87% of monthly goals have been achieved</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-300">Attention Needed</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Bug fix category needs more resources
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
