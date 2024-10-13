import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventsComponent } from '../events/events.component';
import { EventsService } from '../../services/events.service';
import { CalendarComponent } from '../../calendar/calendar.component'; // Import the CalendarComponent
import { TranslateModule } from '@ngx-translate/core';
import { PaymentService } from '../../services/payment.service'; // Import PaymentService
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EventsComponent,
    HttpClientModule,
    CalendarComponent,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  paymentUrl: string = ''; // Initialize as an empty string
  subscribeForm: FormGroup; // Declare the subscribeForm
  successMessage: string | null = null;
  errorMessage: string | null = null;
  testcategories = [
    {
      name: 'Global',
      image: '../../../assets/images/3.jpg',
      description: 'VMware and Egypts ITI collaborate for skills development',
    },
    {
      name: 'Champions',
      image: '../../../assets/images/2.jpg',
      description: 'Zinad IT (Cyber champion) .',
    },
    {
      name: 'Schools',
      image: '../../../assets/images/5.jpg',
      description: 'International Public Schools – October 3 ',
    },
    {
      name: 'Software Companies',
      image: '../../../assets/images/8.jpeg',
      description: 'Explore what is goinig in the Software market',
    },
  ];
  events: any[] = [];
  upcomingEvents: any[] = []; // Add this variable to store upcoming events

  // Pagination settings
  currentPage = 1;
  itemsPerPage = 2;
Math: any;
  // totalPages = 0;

  constructor(
    private router: Router,
    private _EventsService: EventsService,
    private paymentService: PaymentService,
    private http: HttpClient,
    private fb: FormBuilder,

  ) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    // Fetch all events
    // this._EventsService.getEvents().subscribe({
    //   next: (response) => {
    //     this.events = response;
    //   },
    // });

    // Fetch categories
    this._EventsService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });

    // Fetch the first 5 upcoming events
    this._EventsService.getUpcomingEvents().subscribe({
      next: (response) => {
        this.upcomingEvents = response; // Store upcoming events
      },
    });
  }
  // Set hover state
  setHoverState(event: { hover: boolean }, isHovering: boolean) {
    event.hover = isHovering;
  }
  // Navigate to category details
  navigateToCategoryDetails(categoryId: string) {
    this.router.navigate(['/category-details', categoryId]); // Correct path
  }

  // Navigate to event details
  navigateToEventDetails(eventId: string) {
    this.router.navigate(['/event-details', eventId]); // Correct path
  }

  // Handle pagination
  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.events.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  totalPages() {
    return Math.ceil(this.upcomingEvents.length / this.itemsPerPage);
  }

  redirectToPayment(): void {
    const orderId = 'ORDER_ID'; // Replace with your dynamic order ID
    const amount = 10000; // Replace with your dynamic amount

    this.paymentService.initiatePayment(orderId, amount).subscribe({
      next: (response) => {
        console.log('Payment initiated:', response);
        if (response.payment_url) {
          window.location.href = response.payment_url; // Redirect to the Laravel checkout URL
        }
      },
      error: (err) => {
        console.error('Error initiating payment:', err);
      },
    });
  }
  onSubmit() {
    if (this.subscribeForm.valid) {
      this.http.post('http://127.0.0.1:8000/api/subscribe', this.subscribeForm.value)
        .subscribe({
          next: (response: any) => {
            this.successMessage = response.success; // Assuming success message from API
            this.errorMessage = null;
            this.subscribeForm.reset(); // Clear the form on success
          },
          error: (error: any) => {
            this.errorMessage = error.error?.error || 'FOOTER.SUBSCRIBE_ERROR'; // Handle errors
            this.successMessage = null;
          }
        });
    } else {
      this.errorMessage = 'Please provide a valid email address.'; // Display custom error for invalid form
    }
  }

}
