import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Search, Calendar } from "lucide-react"

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-secondary/10">
          <h1 className="text-2xl font-bold text-dark">Welcome back, John!</h1>
          <p className="text-secondary mt-1">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm hover:shadow transition-shadow border-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-dark">Create a Ride</CardTitle>
              <CardDescription className="text-secondary">Offer a ride to others</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                <Link href="/create-ride">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Ride
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow transition-shadow border-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-dark">Find a Ride</CardTitle>
              <CardDescription className="text-secondary">Join someone's journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Link href="/available-rides">
                  <Search className="mr-2 h-4 w-4" />
                  Find Rides
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow transition-shadow border-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-dark">My Rides</CardTitle>
              <CardDescription className="text-secondary">Manage your created rides</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Link href="/my-rides">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Rides
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow transition-shadow border-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-dark">My Bookings</CardTitle>
              <CardDescription className="text-secondary">Rides you've joined</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Link href="/my-bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Bookings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm border-secondary/10">
            <CardHeader>
              <CardTitle className="text-dark">Recent Rides</CardTitle>
              <CardDescription className="text-secondary">Your recently created rides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                    <div>
                      <p className="font-medium text-dark">New York → Boston</p>
                      <p className="text-sm text-secondary">May 15, 2023 • 9:00 AM</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">$45</p>
                      <p className="text-sm text-secondary">3 seats left</p>
                    </div>
                  </div>
                ))}
                {[1, 2].length === 0 && <p className="text-secondary text-center py-4">No rides created yet</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-secondary/10">
            <CardHeader>
              <CardTitle className="text-dark">Recent Bookings</CardTitle>
              <CardDescription className="text-secondary">Rides you've recently joined</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                    <div>
                      <p className="font-medium text-dark">Chicago → Detroit</p>
                      <p className="text-sm text-secondary">May 20, 2023 • 2:00 PM</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">$35</p>
                      <p className="text-sm text-white px-2 py-1 bg-green-500 rounded-full">Confirmed</p>
                    </div>
                  </div>
                ))}
                {[1].length === 0 && <p className="text-secondary text-center py-4">No bookings yet</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
