import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'], // Fixed the property name here
})
export class UserEventsComponent implements OnInit {
  userEvents: any[] = []; // Array to hold the user events
  events: any;
  event: any;

  constructor(private _EventsService: EventsService) {}

  ngOnInit(): void {
    this.loadUserEvents(); // Call the method to load user events on initialization
  }

  // Method to load user events
  loadUserEvents(): void {
    this._EventsService.getUserEvents().subscribe({
      next: (response) => {
        this.userEvents = response; // Store the response in userEvents
        console.log('User Events:', this.userEvents); // Log the events for debugging
      },
      error: (err) => {
        console.error('Error loading user events:', err); // Log any errors
      },
    });
  }
  // loadEvents(): void {
  //   this._EventsService.getEvents().subscribe({
  //     next: (response) => {
  //       this.events = response;
  //       // Update the attended property of each event
  //       this.events.forEach((event: { id: any; attended: boolean }) => {
  //         const userEventIndex = this.userEvents.findIndex(
  //           (userEvent) => userEvent.id === event.id
  //         );
  //         if (userEventIndex !== -1) {
  //           event.attended = true;
  //         } else {
  //           event.attended = false;
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error loading events:', err);
  //     },
  //   });
  // }

  attendEvent(eventId: number): void {
    this._EventsService.attendEvent(eventId).subscribe({
      next: (response) => {
        console.log(response.message);
        // Update the event.attended property
        const eventIndex = this.userEvents.findIndex(event => event.id === eventId);

        if (eventIndex !== -1) {
          this.userEvents.splice(eventIndex, 1); // Remove the event from userEvents array
        }
        // Reload events attended by the user to update the UI
        // this.loadUserEvents();
        // Reload events to update the UI
      },
      error: (err) => {
        console.error('Error attending event:', err);
      },
    });
  }

  
}
