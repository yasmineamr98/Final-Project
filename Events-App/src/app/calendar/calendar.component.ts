import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import router for navigation
import { EventsService } from '../../app/services/events.service';

// Define an interface for the event structure
interface Event {
  id: number;
  title: string;
  start: string; // ISO string representation of date
  end: string; // ISO string representation of date
  description?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    events: this.fetchEvents.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  selectedEvent: Event | null = null;
  showModal = false;

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    // No need to fetch events here since FullCalendar will handle it
  }

  // Fetch events from Laravel API and pass it to FullCalendar
  fetchEvents(fetchInfo: { startStr: string; endStr: string }, successCallback: (events: any[]) => void) {
    this.eventsService.getEventsCalendar(fetchInfo.startStr, fetchInfo.endStr).subscribe(
        (data: Event[]) => {
            const currentDate = new Date();
            const formattedEvents = data.map(event => {
                const eventStartDate = new Date(event.start);
                const eventEndDate = new Date(event.end);

                let classNames = 'event-future'; // Default to future

                if (eventEndDate < currentDate) {
                    classNames = 'event-past';
                } else if (eventStartDate <= currentDate && eventEndDate >= currentDate) {
                    classNames = 'event-current';
                }

                return {
                    id: event.id.toString(),
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    description: event.description || '',
                    classNames: [classNames] // Ensure classNames is an array
                };
            });
            successCallback(formattedEvents);
        },
        (error) => {
            console.error('Error fetching events:', error);
        }
    );
}


  // Event click handler to open the modal
  handleEventClick(info: EventClickArg) {
    this.selectedEvent = {
      id: +info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      description: info.event.extendedProps['description'] || ''
    };
    this.showModal = true;
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
  }

  // Navigate to event details page
  goToEventDetails() {
    if (this.selectedEvent) {
      this.router.navigate(['/event-details', this.selectedEvent.id]);
    }
  }
}
