"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  BookMarkedIcon as MarkAsRead,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "task_assigned",
      title: "New task assigned",
      message: "You have been assigned to 'Implement user authentication'",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: "medium",
      from: "John Doe"
    },
    {
      id: 2,
      type: "task_overdue",
      title: "Task overdue",
      message: "Task 'Database optimization' is now overdue",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      priority: "high",
      from: "System"
    },
    {
      id: 3,
      type: "team_update",
      title: "Team member joined",
      message: "Alex Brown has joined your organization",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      priority: "low",
      from: "System"
    },
    {
      id: 4,
      type: "task_completed",
      title: "Task completed",
      message: "Jane Smith completed 'Design dashboard mockups'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      priority: "medium",
      from: "Jane Smith"
    },
    {
      id: 5,
      type: "meeting_reminder",
      title: "Meeting reminder",
      message: "Team standup meeting starts in 15 minutes",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      read: false,
      priority: "high",
      from: "Calendar"
    },
    {
      id: 6,
      type: "comment",
      title: "New comment",
      message: "Mike Johnson commented on 'API documentation'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      read: true,
      priority: "low",
      from: "Mike Johnson"
    }
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task_assigned":
      case "task_completed":
        return CheckCircle
      case "task_overdue":
        return AlertTriangle
      case "team_update":
        return Users
      case "meeting_reminder":
        return Calendar
      case "comment":
        return MessageSquare
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600"
    if (type === "task_completed") return "text-green-600"
    if (type === "team_update") return "text-blue-600"
    return "text-gray-600"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with your team's activities and important alerts
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {unreadCount} unread
          </Badge>
          <Button variant="outline" onClick={markAllAsRead}>
            <MarkAsRead className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Icon className={`h-4 w-4 ${getNotificationColor(notification.type, notification.priority)}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>From: {notification.from}</span>
                        <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.filter(n => !n.read).map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            return (
              <Card key={notification.id} className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                      <Icon className={`h-4 w-4 ${getNotificationColor(notification.type, notification.priority)}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                              </Badge>
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>From: {notification.from}</span>
                        <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          {notifications.filter(n => n.type.includes('task')).map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Icon className={`h-4 w-4 ${getNotificationColor(notification.type, notification.priority)}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>From: {notification.from}</span>
                        <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          {notifications.filter(n => n.type === 'team_update').map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Icon className={`h-4 w-4 ${getNotificationColor(notification.type, notification.priority)}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>From: {notification.from}</span>
                        <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {notifications.filter(n => n.from === 'System' || n.from === 'Calendar').map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Icon className={`h-4 w-4 ${getNotificationColor(notification.type, notification.priority)}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {
