"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CreateRidePage() {
  const router = useRouter()
  const [date, setDate] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would create the ride
    router.push("/my-rides")
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-dark">Create a Ride</h1>

        <Card className="shadow-sm border-secondary/10">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-dark">Ride Details</CardTitle>
              <CardDescription className="text-secondary">
                Fill in the details of your ride to let others join you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin" className="text-dark">
                    Origin
                  </Label>
                  <Input
                    id="origin"
                    placeholder="e.g. New York"
                    required
                    className="border-secondary/20 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-dark">
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="e.g. Boston"
                    required
                    className="border-secondary/20 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-dark">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-secondary/20",
                          !date && "text-secondary",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-dark">
                    Time
                  </Label>
                  <div className="relative">
                    <Input
                      id="time"
                      type="time"
                      className="pl-10 border-secondary/20 focus-visible:ring-primary"
                      required
                    />
                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-secondary" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats" className="text-dark">
                    Available Seats
                  </Label>
                  <Input
                    id="seats"
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="3"
                    required
                    className="border-secondary/20 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fare" className="text-dark">
                    Fare per Seat ($)
                  </Label>
                  <Input
                    id="fare"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue="25.00"
                    required
                    className="border-secondary/20 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-dark">
                  Additional Notes (Optional)
                </Label>
                <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-secondary/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any additional information about the ride..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Post Ride
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
