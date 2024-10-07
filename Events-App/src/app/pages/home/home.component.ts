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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EventsComponent,
    HttpClientModule,
    CalendarComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  paymentUrl: string = ''; // Initialize as an empty string


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

  // Pagination settings
  currentPage = 1;
  itemsPerPage = 2;

  constructor(
    private router: Router,
    private _EventsService: EventsService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this._EventsService.getEvents().subscribe({
      next: (response) => {
        this.events = response;
      },
    });

    // get categories
    this._EventsService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(this.categories);
        console.log(response);
      },
    });
  }
  // Set hover state
  setHoverState(event: { hover: boolean }, isHovering: boolean) {
    event.hover = isHovering;
  }

  // Navigate to event details
  navigateToEventDetails(eventId: string) {
    this.router.navigate(['/Events-App/src/app/pages/event-details/', eventId]);
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
    return Math.ceil(this.events.length / this.itemsPerPage);
  }



  redirectToPayment(): void {
    const orderId = 'YOUR_ORDER_ID'; // Replace with your dynamic order ID
    const amount = 100; // Replace with your dynamic amount

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

}
