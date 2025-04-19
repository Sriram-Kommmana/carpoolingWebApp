import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, DollarSign, MapPin, Bell } from "lucide-react"
import Link from "next/link"

// Sample data for my rides
const myRides = [
  {
    id: 1,
    origin: "New York",
    destination: "Boston",
    date: "May 15, 2023",
    time: "9:00 AM",
    fare: 45,
    totalSeats: 4,
    availableSeats: 1,
    status: "active",
    requests: 2,
  },
  {
    id: 2,
    origin: "Chicago",
    destination: "Detroit",
    date: "May 20, 2023",
    time: "2:00 PM",
    fare: 35,
    totalSeats: 3,
    availableSeats: 0,
    status: "active",
    requests: 0,
  },
  {
    id: 3,
    origin: "San Francisco",
    destination: "Los Angeles",
    date: "April 22, 2023",
    time: "7:30 AM",
    fare: 60,
    totalSeats: 4,
    availableSeats: 0,
    status: "completed",
    requests: 0,
  },
]

export default function MyRidesPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dark">My Rides</h1>
            <p className="text-secondary">Manage the rides you've created</p>
          </div>

          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/create-ride">Create New Ride</Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary/10">
            <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Completed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 gap-4">
              {myRides
                .filter((ride) => ride.status === "active")
                .map((ride) => (
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

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                              <span className="text-secondary">
                                {ride.availableSeats} of {ride.totalSeats} seats left
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-secondary" />
                              <span className="text-secondary">${ride.fare} per seat</span>
                            </div>
                          </div>

                          {ride.requests > 0 && (
                            <div className="flex items-center gap-2 text-primary">
                              <Bell className="h-4 w-4" />
                              <span>{ride.requests} new booking requests</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 md:items-center">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-secondary/20 text-secondary hover:bg-secondary/10 hover:text-dark"
                          >
                            <Link href={`/my-rides/${ride.id}/participants`}>View Participants</Link>
                          </Button>

                          {ride.requests > 0 && (
                            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white">
                              <Link href={`/my-rides/${ride.id}/requests`}>Review Requests</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {myRides.filter((ride) => ride.status === "active").length === 0 && (
                <div className="text-center py-12">
                  <p className="text-secondary mb-4">You don't have any active rides</p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/create-ride">Create a Ride</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 gap-4">
              {myRides
                .filter((ride) => ride.status === "completed")
                .map((ride) => (
                  <Card key={ride.id} className="shadow-sm border-secondary/10">
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
                            <Badge variant="outline" className="ml-auto border-blue-200 text-blue-700 bg-blue-50">
                              Completed
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                              <span className="text-secondary">{ride.totalSeats - ride.availableSeats} passengers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-secondary" />
                              <span className="text-secondary">${ride.fare} per seat</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary hover:bg-primary/10"
                          >
                            <Link href={`/my-rides/${ride.id}/participants`}>View Participants</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {myRides.filter((ride) => ride.status === "completed").length === 0 && (
                <div className="text-center py-12">
                  <p className="text-secondary">You don't have any completed rides</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="text-center py-12">
              <p className="text-secondary">You don't have any cancelled rides</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
