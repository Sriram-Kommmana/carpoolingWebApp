import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Calendar, Clock, Users, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

// Sample data for available rides
const availableRides = [
  {
    id: 1,
    origin: "New York",
    destination: "Boston",
    date: "May 15, 2023",
    time: "9:00 AM",
    fare: 45,
    availableSeats: 3,
    driver: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    origin: "Chicago",
    destination: "Detroit",
    date: "May 20, 2023",
    time: "2:00 PM",
    fare: 35,
    availableSeats: 2,
    driver: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    origin: "San Francisco",
    destination: "Los Angeles",
    date: "May 22, 2023",
    time: "7:30 AM",
    fare: 60,
    availableSeats: 4,
    driver: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 4,
    origin: "Seattle",
    destination: "Portland",
    date: "May 25, 2023",
    time: "10:15 AM",
    fare: 30,
    availableSeats: 1,
    driver: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default function AvailableRidesPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dark">Available Rides</h1>
            <p className="text-secondary">Find and join rides created by other users</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary" />
              <Input type="search" placeholder="Search rides..." className="pl-8 border-secondary/20" />
            </div>
            <Button variant="outline" size="icon" className="border-secondary/20">
              <Search className="h-4 w-4 text-secondary" />
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border-secondary/10">
          <CardHeader>
            <CardTitle className="text-dark">Filter Rides</CardTitle>
            <CardDescription className="text-secondary">Narrow down your search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="fromLocation" className="text-dark">
                  From
                </Label>
                <Input id="fromLocation" placeholder="Origin city" className="border-secondary/20" />
              </div>
              <div>
                <Label htmlFor="toLocation" className="text-dark">
                  To
                </Label>
                <Input id="toLocation" placeholder="Destination city" className="border-secondary/20" />
              </div>
              <div>
                <Label htmlFor="date" className="text-dark">
                  Date
                </Label>
                <Input id="date" type="date" className="border-secondary/20" />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {availableRides.map((ride) => (
            <Card key={ride.id} className="shadow-sm hover:shadow transition-shadow border-secondary/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-lg font-medium text-dark">
                        <MapPin className="h-5 w-5 text-secondary" />
                        {ride.origin}
                      </div>
                      <div className="text-secondary">→</div>
                      <div className="flex items-center gap-2 text-lg font-medium text-dark">
                        <MapPin className="h-5 w-5 text-secondary" />
                        {ride.destination}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <span className="text-secondary">{ride.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span className="text-secondary">{ride.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="text-secondary">{ride.availableSeats} seats available</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={ride.driver.avatar || "/placeholder.svg"}
                        alt={ride.driver.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm text-secondary">Posted by {ride.driver.name}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between md:items-end gap-4 md:min-w-[150px]">
                    <div className="flex items-center text-xl font-bold text-primary">
                      <DollarSign className="h-5 w-5" />
                      {ride.fare}
                      <span className="text-sm font-normal text-secondary ml-1">per seat</span>
                    </div>

                    <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                      <Link href={`/request-ride/${ride.id}`}>Request to Join</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {availableRides.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary mb-4">No rides available at the moment</p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link href="/create-ride">Create a Ride Instead</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
