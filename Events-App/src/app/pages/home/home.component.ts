import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories = [
    {
      name: 'Sports',
      image: '../../../assets/images/3.jpg',
      description: 'Explore thrilling sports events around you.',
    },
    {
      name: 'Night Life',
      image: '../../../assets/images/2.jpg',
      description: 'Discover vibrant night life spots.',
    },
    {
      name: 'Hot Deals',
      image: '../../../assets/images/5.jpg',
      description: 'Get the hottest deals in your city.',
    },
    {
      name: 'Food',
      image: '../../../assets/images/8.jpeg',
      description: 'Taste the best dishes with great discounts.',
    },
  ];

  events = [
    {
      id: 'event1',
      image: 'assets/images/3.jpg',
      name: 'Summer Festival',
      place: 'Central Park',
      date: '2024-10-04',
      hover: false,
    },
    {
      id: 'event2',
      image: 'assets/images/4.jpg',
      name: 'Music Concert',
      place: 'Downtown Arena',
      date: '2024-11-15',
      hover: false,
    },
    {
      id: 'event3',
      image: 'assets/images/5.jpg',
      name: 'Art Exhibition',
      place: 'City Gallery',
      date: '2024-12-20',
      hover: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  setHoverState(event: { hover: boolean }, isHovering: boolean) {
    event.hover = isHovering;
  }

  navigateToEventDetails(eventId: string) {
    this.router.navigate(['/Events-App/src/app/pages/event-details/', eventId]);
  }
}
