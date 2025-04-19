import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

// Sample data for my bookings
const myBookings = [
  {
    id: 1,
    ride: {
      id: 201,
      origin: "Chicago",
      destination: "Detroit",
      date: "May 20, 2023",
      time: "2:00 PM",
      fare: 35,
    },
    driver: {
      id: 301,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seatsBooked: 1,
    status: "confirmed",
    bookedAt: "May 15, 2023",
  },
  {
    id: 2,
    ride: {
      id: 202,
      origin: "San Francisco",
      destination: "Los Angeles",
      date: "May 22, 2023",
      time: "7:30 AM",
      fare: 60,
    },
    driver: {
      id: 302,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seatsBooked: 2,
    status: "pending",
    bookedAt: "May 16, 2023",
  },
  {
    id: 3,
    ride: {
      id: 203,
      origin: "Boston",
      destination: "New York",
      date: "April 10, 2023",
      time: "10:00 AM",
      fare: 45,
    },
    driver: {
      id: 303,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seatsBooked: 1,
    status: "completed",
    bookedAt: "April 5, 2023",
  },
]

export default function MyBookingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">My Bookings</h1>
          <p className="text-secondary">Rides you've requested to join</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-secondary/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Pending
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Confirmed
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-4">
              {myBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}

              {myBookings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-secondary mb-4">You don't have any bookings</p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/available-rides">Find a Ride</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="grid grid-cols-1 gap-4">
              {myBookings
                .filter((booking) => booking.status === "pending")
                .map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}

              {myBookings.filter((booking) => booking.status === "pending").length === 0 && (
                <div className="text-center py-12">
                  <p className="text-secondary">You don't have any pending bookings</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="confirmed">
            <div className="grid grid-cols-1 gap-4">
              {myBookings
                .filter((booking) => booking.status === "confirmed")
                .map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}

              {myBookings.filter((booking) => booking.status === "confirmed").length === 0 && (
                <div className="text-center py-12">
                  <p className="text-secondary">You don't have any confirmed bookings</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 gap-4">
              {myBookings
                .filter((booking) => booking.status === "completed")
                .map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}

              {myBookings.filter((booking) => booking.status === "completed").length === 0 && (
                <div className="text-center py-12">
                  <p className="text-secondary">You don't have any completed bookings</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

function BookingCard({ booking }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Confirmed
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="shadow-sm hover:shadow transition-shadow border-secondary/10">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-lg font-medium text-dark">
                <MapPin className="h-5 w-5 text-secondary" />
                {booking.ride.origin}
              </div>
              <div className="text-secondary">→</div>
              <div className="flex items-center gap-2 text-lg font-medium text-dark">
                <MapPin className="h-5 w-5 text-secondary" />
                {booking.ride.destination}
              </div>
              <div className="ml-auto">{getStatusBadge(booking.status)}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-secondary" />
                <span className="text-secondary">{booking.ride.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" />
                <span className="text-secondary">{booking.ride.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" />
                <span className="text-secondary">{booking.seatsBooked} seats booked</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-secondary" />
                <span className="text-secondary">${booking.ride.fare * booking.seatsBooked} total</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={booking.driver.avatar || "/placeholder.svg"} alt={booking.driver.name} />
                <AvatarFallback>{booking.driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-sm text-secondary">
                  Ride by{" "}
                  <Link href={`/users/${booking.driver.id}`} className="font-medium hover:underline text-primary">
                    {booking.driver.name}
                  </Link>
                </span>
                <p className="text-xs text-secondary">Booked on {booking.bookedAt}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:justify-center">
            {booking.status === "pending" && (
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                Cancel Request
              </Button>
            )}

            {booking.status === "confirmed" && (
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                Cancel Booking
              </Button>
            )}

            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href={`/rides/${booking.ride.id}`}>View Ride Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
