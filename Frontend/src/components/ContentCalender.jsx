// Frontend/src/components/ContentCalender.jsx
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar as CalendarIcon, Clock, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  createCalendarEvent,
  getCalendarEvents,
  deleteCalendarEvent,
} from "@/apiCalls/calendarAPI";

const ContentCalendar = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const colorStages = [
    "bg-growth-seed",
    "bg-growth-sprout",
    "bg-growth-sapling",
    "bg-growth-bloom",
    "bg-growth-harvest",
  ];

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getCalendarEvents();
      // Convert date strings back to Date objects
      const parsedEvents = fetchedEvents.map(event => ({
        ...event,
        date: new Date(event.date),
      }));
      setEvents(parsedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Failed to load events",
        description: error.message || "Could not load calendar events",
        variant: "destructive",
      });
    }
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
      setIsDialogOpen(true);
    }
  };

  const handleEventSave = async () => {
    if (eventTitle && selectedDate) {
      setIsLoading(true);
      try {
        const newEvent = {
          title: eventTitle,
          date: selectedDate.toISOString(),
          time: eventTime,
          details: eventDetails,
          colorStage: Math.floor(Math.random() * colorStages.length),
        };

        const savedEvent = await createCalendarEvent(newEvent);
        
        // Add to local state with parsed date
        setEvents([...events, { ...savedEvent.event, date: new Date(savedEvent.event.date) }]);
        
        setEventTitle("");
        setEventDetails("");
        setEventTime("");
        setIsDialogOpen(false);

        toast({
          title: "Event planted! 🌱",
          description: "Your content event has been added to the calendar.",
        });
      } catch (error) {
        console.error("Error creating event:", error);
        toast({
          title: "Failed to create event",
          description: error.message || "Could not create calendar event",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteCalendarEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));
      
      toast({
        title: "Event removed",
        description: "Calendar event has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Failed to delete event",
        description: error.message || "Could not delete event",
        variant: "destructive",
      });
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const hasEvents = (date) => getEventsForDate(date).length > 0;

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-0 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Content Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateClick}
              className={cn("rounded-md border-0 shadow-soft pointer-events-auto")}
              modifiers={{
                hasEvents: (date) => hasEvents(date),
              }}
              modifiersClassNames={{
                hasEvents: "bg-growth-sprout text-primary font-semibold",
              }}
            />

            <DialogContent className="sm:max-w-md shadow-strong border-0">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Add Content Event
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Name</Label>
                  <Input
                    id="title"
                    placeholder="YouTube Video: Pixel Art Tutorial"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="shadow-soft"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="shadow-soft"
                  />
                </div>

                <div>
                  <Label htmlFor="details" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Details
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Cover the basics of pixel art creation, tools, and techniques..."
                    value={eventDetails}
                    onChange={(e) => setEventDetails(e.target.value)}
                    className="shadow-soft resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleEventSave}
                  className="w-full shadow-medium"
                  disabled={!eventTitle || isLoading}
                >
                  {isLoading ? "Planting..." : "Plant in Calendar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Saved Events */}
      {events.length > 0 && (
        <Card className="shadow-soft border-0 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Planted Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 ">
            {events.map((event) => (
              <div
                key={event._id}
                className={cn("p-4 rounded-lg shadow-soft text-white bg-green-800")}
              >
                <div className="flex justify-between items-start mb-2 ">
                  <h4 className="font-semibold text-primary text-white">{event.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-primary/70 text-white">
                      {event.date.toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {event.time && (
                  <p className="text-sm text-primary/80 mb-1 text-white">⏰ {event.time}</p>
                )}
                {event.details && (
                  <p className="text-sm text-primary/70 text-white">{event.details}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentCalendar;