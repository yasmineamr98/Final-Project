import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'], // Fixed typo here, should be 'styleUrls'
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  userEvents: any[] = [];

  constructor(private _EventsService: EventsService) {}

  ngOnInit(): void {
    // Load user-attended events
    this.loadUserEvents();
    // Load all events
    this.loadEvents();
  }

  // Load all events
// Load all events
loadEvents(): void {
  this._EventsService.getEvents().subscribe({
    next: (response) => {
      this.events = response;
      // Update the attended property of each event
      this.events.forEach(event => {
        const userEventIndex = this.userEvents.findIndex(userEvent => userEvent.id === event.id);
        event.attended = userEventIndex !== -1;

      });
    },
    error: (err) => {
      console.error('Error loading events:', err);
    },
  });
}

  // Load events attended by the current user
  loadUserEvents(): void {
    this._EventsService.getUserEvents().subscribe({
      next: (response) => {
        this.userEvents = response;
        console.log('User Events:', this.userEvents);

        this.loadEvents(); // Now that we have userEvents, we can load all events

      },
      error: (err) => {
        console.error('Error loading user events:', err);
      },
    });
  }

  // Handle user attending or leaving an event
// Handle user attending or leaving an event
// Handle user attending or leaving an event
attendEvent(eventId: number): void {
  this._EventsService.attendEvent(eventId).subscribe({
    next: (response) => {
      console.log(response.message);
      // Update the event.attended property
      const eventIndex = this.events.findIndex(event => event.id === eventId);
      if (eventIndex !== -1) {
        this.events[eventIndex].attended = !this.events[eventIndex].attended;
      }
      // Reload events attended by the user to update the UI
      this.loadUserEvents();
      // Reload events to update the UI
      // this.loadEvents();
    },
    error: (err) => {
      console.error('Error attending event:', err);
    },
  });
}
}
