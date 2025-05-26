"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Users, Calendar, BarChart3, Shield, Zap, ArrowRight, Star, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LandingPage() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    joinExisting: false,
    inviteCode: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Welcome back!",
      description: "Successfully signed in to your account.",
    })

    setIsLoading(false)

    // Navigate to dashboard
    window.location.href = "/dashboard"
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (registerForm.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!registerForm.joinExisting && !registerForm.organizationName) {
      toast({
        title: "Error",
        description: "Please enter an organization name.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (registerForm.joinExisting && !registerForm.inviteCode) {
      toast({
        title: "Error",
        description: "Please enter an invite code.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Account created!",
      description: registerForm.joinExisting
        ? "Successfully joined the organization."
        : "Your organization has been created.",
    })

    setIsLoading(false)

    // Navigate to dashboard
    window.location.href = "/dashboard"
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-effect border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-gray-600 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 animate-fade-in">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#demo"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium"
            >
              Demo
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
              <Zap className="h-4 w-4" />
              <span>New: AI-powered task automation</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Streamline Your Team's
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Task Management
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Multi-tenant platform with role-based access, automated workflows, and real-time collaboration for modern
              organizations. Trusted by 10,000+ teams worldwide.
            </p>

            {/* Social Proof */}
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-medium"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Join 10,000+ happy users</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { icon: Users, text: "Multi-tenant Architecture" },
                { icon: Shield, text: "Role-based Access" },
                { icon: Calendar, text: "Smart Scheduling" },
                { icon: Zap, text: "Automated Workflows" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover-lift"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="premium-button group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 hover-lift">
                <Play className="h-4 w-4" />
                <span>Watch Demo</span>
              </Button>
            </div>
          </div>

          {/* Auth Forms */}
          <div className="w-full max-w-md mx-auto animate-slide-up">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="premium-card">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Sign in to your organization account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full premium-button" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                      <div className="text-center">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card className="premium-card">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription>Start your organization's journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="john@company.com"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Password</Label>
                          <Input
                            id="reg-password"
                            type="password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <Checkbox
                          id="join-existing"
                          checked={registerForm.joinExisting}
                          onCheckedChange={(checked) =>
                            setRegisterForm({ ...registerForm, joinExisting: checked as boolean })
                          }
                        />
                        <Label htmlFor="join-existing" className="text-sm font-medium">
                          Join existing organization
                        </Label>
                      </div>

                      {registerForm.joinExisting ? (
                        <div className="space-y-2">
                          <Label htmlFor="invite-code">Invite Code</Label>
                          <Input
                            id="invite-code"
                            placeholder="Enter invite code"
                            value={registerForm.inviteCode}
                            onChange={(e) => setRegisterForm({ ...registerForm, inviteCode: e.target.value })}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="org-name">Organization Name</Label>
                          <Input
                            id="org-name"
                            placeholder="Acme Corp"
                            value={registerForm.organizationName}
                            onChange={(e) => setRegisterForm({ ...registerForm, organizationName: e.target.value })}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      )}

                      <Button type="submit" className="w-full premium-button" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <section id="features" className="mt-32">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
              <Zap className="h-4 w-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Everything Your Team Needs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed for modern organizations to boost productivity and collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Multi-Tenant Architecture",
                description:
                  "Complete data isolation per organization with role-based access control for Admins, Managers, and Members.",
                color: "from-blue-500 to-cyan-500",
                features: ["Data Isolation", "Role Management", "Secure Access"],
              },
              {
                icon: Calendar,
                title: "Smart Task Management",
                description:
                  "Automated task expiry, priority management, and real-time notifications to keep your team on track.",
                color: "from-purple-500 to-pink-500",
                features: ["Auto Expiry", "Priority System", "Real-time Updates"],
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description:
                  "Comprehensive insights into task completion, team performance, and organizational productivity.",
                color: "from-green-500 to-emerald-500",
                features: ["Performance Metrics", "Team Insights", "Progress Tracking"],
              },
            ].map((feature, index) => (
              <div key={index} className="group relative" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <Card className="relative premium-card card-hover-effect h-full">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 pulse-glow`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-32 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Teams Worldwide</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of organizations already using TaskFlow
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "500+", label: "Organizations" },
              { number: "1M+", label: "Tasks Completed" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
