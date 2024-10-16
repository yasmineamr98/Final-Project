import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
HttpClientModule

// Define the structure for an event
interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  capacity: number;
  location: string;
  event_image: string;
  category_id: number;
  user_id: number | null;
  start_time: string | null;
  end_time: string | null;
}

// Define the structure for a category
interface Category {
  name: string;
  description: string;
  category_image: string;
  events: Event[]; // Array of events
}

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, TranslateModule, HttpClientModule, RouterLink],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category = { name: '', description: '', category_image: '', events: [] }; // Initialize with an empty category
  events: Event[] = [];
  eventDetails: any; // Holds the event details

  constructor(
    private route: ActivatedRoute,
    private _EventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (categoryId) {
      // Fetch category details and related events
      this._EventsService.getEventsByCategory(categoryId).subscribe({
        next: (response: Category) => { // Specify the response type
          this.category = response;          // Entire response is the category
          this.events = response.events;     // Extract events array from the response

          console.log('Category:', this.category);
          console.log('Events:', this.events);
        },
        error: (err) => {
          console.error('Error fetching events:', err);
        }
      });
    } else {
      console.error('Category ID is null');
    }
  }

  // Implement the navigation to event details
  navigateToEventDetails(eventId: string): void {
    this.router.navigate(['/event-details', eventId]);
  }
  attendEvent(eventId: number): void {
    this._EventsService.attendEvent(eventId).subscribe({
      next: (response) => {
        console.log(response.message);
        // Toggle the attended status
        this.eventDetails.attended = !this.eventDetails.attended;
        // Optionally, you can update the event list or perform any additional actions
      },
      error: (err) => {
        console.error('Error attending event:', err);
      },
    });
  }

}
