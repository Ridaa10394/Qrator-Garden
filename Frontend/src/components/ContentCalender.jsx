import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar as CalendarIcon, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ContentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventTime, setEventTime] = useState("");

  const colorStages = [
    "bg-growth-seed",
    "bg-growth-sprout",
    "bg-growth-sapling",
    "bg-growth-bloom",
    "bg-growth-harvest",
  ];

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
      setIsDialogOpen(true);
    }
  };

  const handleEventSave = () => {
    if (eventTitle && selectedDate) {
      const newEvent = {
        id: Date.now().toString(),
        date: selectedDate,
        title: eventTitle,
        details: eventDetails,
        time: eventTime,
        colorStage: Math.floor(Math.random() * colorStages.length),
      };

      setEvents([...events, newEvent]);
      setEventTitle("");
      setEventDetails("");
      setEventTime("");
      setIsDialogOpen(false);
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const hasEvents = (date) => getEventsForDate(date).length > 0;

  const getDateColor = (date) => {
    const eventsForDate = getEventsForDate(date);
    if (eventsForDate.length > 0) {
      return colorStages[eventsForDate[0].colorStage];
    }
    return "";
  };

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
                  disabled={!eventTitle}
                >
                  Plant in Calendar
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
          <CardContent className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className={cn("p-4 rounded-lg shadow-soft", colorStages[event.colorStage])}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-primary">{event.title}</h4>
                  <span className="text-sm text-primary/70">
                    {event.date.toLocaleDateString()}
                  </span>
                </div>
                {event.time && (
                  <p className="text-sm text-primary/80 mb-1">⏰ {event.time}</p>
                )}
                {event.details && (
                  <p className="text-sm text-primary/70">{event.details}</p>
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
