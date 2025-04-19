import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, MapPin, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

// Sample user data
const userData = {
  id: 103,
  fullName: "Alex Johnson",
  username: "alexj",
  gender: "Male",
  avatar: "/placeholder.svg?height=128&width=128",
  joinedAt: "March 2023",
  totalRides: 12,
  totalBookings: 5,
  rating: 4.8,
  reviews: [
    {
      id: 1,
      author: "Sarah Wilson",
      rating: 5,
      comment: "Great ride companion! Very punctual and friendly.",
      date: "April 15, 2023",
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      comment: "Good conversation and reliable driver.",
      date: "May 2, 2023",
    },
  ],
}

export default function UserProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-secondary hover:bg-secondary/10 hover:text-dark"
          >
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-dark">User Profile</h1>
        </div>

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

                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-dark">{userData.rating}</span>
                    <span className="text-secondary">({userData.reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Ride Statistics</CardTitle>
              <CardDescription>User's activity on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">{userData.totalRides}</p>
                  <p className="text-gray-500">Rides Created</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">{userData.totalBookings}</p>
                  <p className="text-gray-500">Rides Joined</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Favorite Routes</CardTitle>
              <CardDescription>User's most traveled routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">San Francisco → Los Angeles</p>
                      <p className="text-sm text-gray-500">5 times</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Seattle → Portland</p>
                      <p className="text-sm text-gray-500">3 times</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>What others say about this user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{review.author}</div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              ))}

              {userData.reviews.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
