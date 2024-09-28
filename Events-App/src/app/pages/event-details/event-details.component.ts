import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']  // Corrected styleUrls
})
export class EventDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _EventsService: EventsService) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        // Check if 'id' exists in the params and is not null
        const eventIdStr = params.get('id');

        // Handle the case when 'id' is null
        if (eventIdStr !== null) {
          const eventId: number = +eventIdStr; // Convert to number
          
          this._EventsService.getEventDetails(eventId).subscribe({
            next: (response) => {
              const eventDetails = response.find((event: any) => event.id === eventId);

              if (eventDetails) {
                console.log(eventDetails);  // Output the event details
              } else {
                console.error('Event not found!');
              }
            },
            error: (error) => {
              console.error('Error fetching event details:', error);
            }
          });
        } else {
          console.error('Event ID is null!');
        }
      }
    });
  }
}
