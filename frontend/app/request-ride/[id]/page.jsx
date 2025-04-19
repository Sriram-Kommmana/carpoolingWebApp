"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, DollarSign, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample ride data
const rideData = {
  id: 1,
  origin: "New York",
  destination: "Boston",
  date: "May 15, 2023",
  time: "9:00 AM",
  fare: 45,
  totalSeats: 4,
  availableSeats: 3,
  driver: {
    id: 301,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    totalRides: 15,
  },
}

export default function RequestRidePage() {
  const router = useRouter()
  const [seats, setSeats] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would submit the request
    router.push("/my-bookings")
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-secondary hover:bg-secondary/10 hover:text-dark"
          >
            <Link href="/available-rides">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-dark">Request to Join Ride</h1>
        </div>

        <Card className="shadow-sm mb-6 border-secondary/10">
          <CardHeader>
            <CardTitle className="text-dark">Ride Details</CardTitle>
            <CardDescription className="text-secondary">Information about the ride</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-lg font-medium text-dark">
                    <MapPin className="h-5 w-5 text-secondary" />
                    {rideData.origin}
                  </div>
                  <div className="text-secondary">→</div>
                  <div className="flex items-center gap-2 text-lg font-medium text-dark">
                    <MapPin className="h-5 w-5 text-secondary" />
                    {rideData.destination}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">{rideData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">{rideData.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">
                      {rideData.availableSeats} of {rideData.totalSeats} seats left
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">${rideData.fare} per seat</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={rideData.driver.avatar || "/placeholder.svg"} alt={rideData.driver.name} />
                    <AvatarFallback>{rideData.driver.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/users/${rideData.driver.id}`} className="font-medium hover:underline text-primary">
                        {rideData.driver.name}
                      </Link>
                      <span className="text-sm text-secondary">({rideData.driver.rating} ★)</span>
                    </div>
                    <p className="text-xs text-secondary">{rideData.driver.totalRides} rides created</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-secondary/10">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-dark">Booking Request</CardTitle>
              <CardDescription className="text-secondary">
                Fill in the details to request a seat on this ride
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seats" className="text-dark">
                  Number of Seats
                </Label>
                <Input
                  id="seats"
                  type="number"
                  min="1"
                  max={rideData.availableSeats}
                  value={seats}
                  onChange={(e) => setSeats(Number.parseInt(e.target.value))}
                  required
                  className="border-secondary/20 focus-visible:ring-primary"
                />
                <p className="text-sm text-secondary">Total cost: ${rideData.fare * seats}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-dark">
                  Message to Driver (Optional)
                </Label>
                <textarea
                  id="message"
                  className="flex min-h-[80px] w-full rounded-md border border-secondary/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Introduce yourself or add any special requests..."
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                Submit Request
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto border-secondary/20 text-secondary hover:bg-secondary/10 hover:text-dark"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
