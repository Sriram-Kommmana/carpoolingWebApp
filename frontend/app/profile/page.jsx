import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Mail, User, MapPin, Edit } from "lucide-react"
import Link from "next/link"

// Sample user data
const userData = {
  id: 1,
  fullName: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  gender: "Male",
  avatar: "/placeholder.svg?height=128&width=128",
  joinedAt: "January 2023",
  totalRides: 5,
  totalBookings: 8,
}

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-dark">My Profile</h1>

        <Card className="shadow-sm mb-6 border-secondary/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-32 w-32 border-4 border-white shadow-sm">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.fullName} />
                <AvatarFallback className="text-4xl">{userData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-dark">{userData.fullName}</h2>
                    <p className="text-secondary">@{userData.username}</p>
                  </div>

                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/profile/edit">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">{userData.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">Joined {userData.joinedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-sm border-secondary/10">
            <CardHeader>
              <CardTitle className="text-dark">Ride Statistics</CardTitle>
              <CardDescription className="text-secondary">Your activity on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/5 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{userData.totalRides}</p>
                  <p className="text-secondary">Rides Created</p>
                </div>
                <div className="bg-secondary/5 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{userData.totalBookings}</p>
                  <p className="text-secondary">Rides Joined</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-secondary/10">
            <CardHeader>
              <CardTitle className="text-dark">Favorite Routes</CardTitle>
              <CardDescription className="text-secondary">Your most traveled routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium text-dark">New York → Boston</p>
                      <p className="text-sm text-secondary">3 times</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium text-dark">Chicago → Detroit</p>
                      <p className="text-sm text-secondary">2 times</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-secondary/10">
          <CardHeader>
            <CardTitle className="text-dark">Reviews</CardTitle>
            <CardDescription className="text-secondary">What others say about you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-secondary">No reviews yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
