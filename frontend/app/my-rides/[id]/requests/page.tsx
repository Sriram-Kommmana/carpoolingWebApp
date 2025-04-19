import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, DollarSign, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample data for ride details
const rideDetails = {
  id: 1,
  origin: "New York",
  destination: "Boston",
  date: "May 15, 2023",
  time: "9:00 AM",
  fare: 45,
  totalSeats: 4,
  availableSeats: 1,
}

// Sample data for booking requests
const bookingRequests = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      gender: "Female",
    },
    seatsRequested: 2,
    requestedAt: "May 10, 2023",
    status: "pending",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "James Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      gender: "Male",
    },
    seatsRequested: 1,
    requestedAt: "May 11, 2023",
    status: "pending",
  },
]

export default function BookingRequestsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/my-rides">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Booking Requests</h1>
        </div>

        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle>Ride Details</CardTitle>
            <CardDescription>Information about the ride</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    {rideDetails.origin}
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    {rideDetails.destination}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{rideDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{rideDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {rideDetails.availableSeats} of {rideDetails.totalSeats} seats left
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>${rideDetails.fare} per seat</span>
                  </div>
                </div>
              </div>

              <div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/my-rides/${rideDetails.id}/participants`}>View Participants</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Booking Requests</CardTitle>
            <CardDescription>People who want to join your ride</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
                      <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/users/${request.user.id}`} className="font-medium hover:underline">
                          {request.user.name}
                        </Link>
                        <Badge variant="outline" className="text-xs">
                          {request.user.gender}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>Requested {request.seatsRequested} seats</span>
                        <span className="mx-2">•</span>
                        <span>on {request.requestedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/users/${request.user.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}

              {bookingRequests.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No booking requests yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
