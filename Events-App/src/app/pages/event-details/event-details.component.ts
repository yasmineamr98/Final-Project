import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventDetails: any; // Holds the event details

  constructor(private _ActivatedRoute: ActivatedRoute, private _EventsService: EventsService) {}

  ngOnInit(): void {
    // Subscribe to route params to get the event ID
    this._ActivatedRoute.paramMap.subscribe(params => {
      const eventIdStr = params.get('id');

      // If 'id' is not null, proceed to fetch the event details
      if (eventIdStr) {
        const eventId = +eventIdStr; // Convert the ID to a number

        // Fetch event details from the service
        this._EventsService.getEventDetails(eventId).subscribe({
          next: (response) => {
            this.eventDetails = response; // Directly assign the response to eventDetails
            console.log(this.eventDetails); // Check the data in the console
          },
          error: (error) => {
            console.error('Error fetching event details:', error);
          }
        });
      } else {
        console.error('Event ID is null!');
      }
    });
  }

  
}
