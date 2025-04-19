"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [avatar, setAvatar] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    // In a real app, we would authenticate the user
    router.push("/dashboard")
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // In a real app, we would register the user
    router.push("/dashboard")
  }

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setAvatar(event.target.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark">CarpoolConnect</h1>
          <p className="text-secondary">Share your journey with others</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/10">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-white rounded-t-2xl">
                <CardTitle className="text-dark">Login</CardTitle>
                <CardDescription className="text-secondary">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-dark">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="border-secondary/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-dark">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="border-secondary/20 focus-visible:ring-primary"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-white rounded-t-2xl">
                <CardTitle className="text-dark">Register</CardTitle>
                <CardDescription className="text-secondary">Create a new account to get started</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-dark">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      required
                      className="border-secondary/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-dark">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      required
                      className="border-secondary/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="text-dark">
                      Email
                    </Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="border-secondary/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="text-dark">
                      Password
                    </Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      required
                      className="border-secondary/20 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-dark">
                      Gender
                    </Label>
                    <Select>
                      <SelectTrigger className="border-secondary/20 focus-visible:ring-primary">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar" className="text-dark">
                      Avatar
                    </Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 bg-secondary/10">
                        <AvatarImage src={avatar || ""} />
                        <AvatarFallback className="bg-secondary/20">
                          <Upload className="h-6 w-6 text-secondary" />
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="flex-1 border-secondary/20 focus-visible:ring-primary"
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                    Register
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
