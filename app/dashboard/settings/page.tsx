"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Building, Bell, Shield, Palette, Globe, Save, AlertTriangle, Users, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  const [orgSettings, setOrgSettings] = useState({
    name: "Acme Corporation",
    description: "A leading technology company focused on innovation and excellence.",
    website: "https://acme.com",
    timezone: "UTC-5",
    language: "en",
    theme: "system",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    overdueAlerts: true,
    weeklyReports: false,
    teamUpdates: true,
    securityAlerts: true,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "24",
    passwordPolicy: "strong",
    ipRestriction: false,
    auditLogs: true,
  })

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organization Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your organization's preferences and configuration</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Organization Information</span>
              </CardTitle>
              <CardDescription>Update your organization's basic information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={orgSettings.name}
                  onChange={(e) => setOrgSettings({ ...orgSettings, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="org-description">Description</Label>
                <Textarea
                  id="org-description"
                  value={orgSettings.description}
                  onChange={(e) => setOrgSettings({ ...orgSettings, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="org-website">Website</Label>
                <Input
                  id="org-website"
                  type="url"
                  value={orgSettings.website}
                  onChange={(e) => setOrgSettings({ ...orgSettings, website: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Timezone</Label>
                  <Select
                    value={orgSettings.timezone}
                    onValueChange={(value) => setOrgSettings({ ...orgSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                      <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Language</Label>
                  <Select
                    value={orgSettings.language}
                    onValueChange={(value) => setOrgSettings({ ...orgSettings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("General")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize the look and feel of your organization's workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Theme</Label>
                <Select
                  value={orgSettings.theme}
                  onValueChange={(value) => setOrgSettings({ ...orgSettings, theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Appearance")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Reminders</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get reminded about upcoming task deadlines</p>
                </div>
                <Switch
                  checked={notifications.taskReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Overdue Alerts</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Receive alerts for overdue tasks</p>
                </div>
                <Switch
                  checked={notifications.overdueAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, overdueAlerts: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get weekly summary reports</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Team Updates</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Notifications about team member activities</p>
                </div>
                <Switch
                  checked={notifications.teamUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, teamUpdates: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Important security notifications</p>
                </div>
                <Switch
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Notifications")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your organization's security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Require 2FA for all organization members</p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                />
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Session Timeout</Label>
                <Select
                  value={security.sessionTimeout}
                  onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Password Policy</Label>
                <Select
                  value={security.passwordPolicy}
                  onValueChange={(value) => setSecurity({ ...security, passwordPolicy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="strict">Strict (16+ chars, symbols required)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Restriction</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Restrict access to specific IP addresses</p>
                </div>
                <Switch
                  checked={security.ipRestriction}
                  onCheckedChange={(checked) => setSecurity({ ...security, ipRestriction: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Logs</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Keep detailed logs of user activities</p>
                </div>
                <Switch
                  checked={security.auditLogs}
                  onCheckedChange={(checked) => setSecurity({ ...security, auditLogs: checked })}
                />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Security")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Professional Plan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Up to 50 team members, unlimited tasks</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$29</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">per month</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-medium">Team Members</p>
                  <p className="text-2xl font-bold">5/50</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Storage Used</p>
                  <p className="text-2xl font-bold">2.1GB</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-medium">API Calls</p>
                  <p className="text-2xl font-bold">1.2K</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Billing Information</h4>
                <div className="grid gap-4">
                  <div className="flex justify-between">
                    <span>Next billing date:</span>
                    <span className="font-medium">February 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment method:</span>
                    <span className="font-medium">•••• •••• •••• 4242</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing email:</span>
                    <span className="font-medium">billing@acme.com</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex space-x-2">
                <Button variant="outline">Update Payment Method</Button>
                <Button variant="outline">Download Invoice</Button>
                <Button variant="outline">Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription>Irreversible actions that affect your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">Cancel Subscription</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Cancel your subscription and downgrade to free plan
                  </p>
                </div>
                <Button variant="destructive">Cancel Plan</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">Delete Organization</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Permanently delete this organization and all its data
                  </p>
                </div>
                <Button variant="destructive">Delete Organization</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
