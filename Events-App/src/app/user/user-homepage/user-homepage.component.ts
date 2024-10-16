import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [CommonModule,TranslateModule
  ],
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css'],
})
export class UserHomepageComponent implements OnInit {
  event: any;
  isHovering = false; // Ensure this is a boolean

  constructor(private router: Router) {}

  ngOnInit() {
    this.event = {
      id: 'event1',
      image: '/Events-App/src/assets/images/3.jpg',
      name: 'Summer Festival',
      place: 'Central Park',
      date: '2024-10-04',
    };
  }

  navigateToEventDetails(eventId: string) {
    this.router.navigate(['/Events-App/src/app/pages/event-details/', eventId]);
  }
}
