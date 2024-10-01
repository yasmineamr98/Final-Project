import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

@Component({
  selector: 'app-user-notifications',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css'],
})
export class UserNotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (response) => {
        // Assigning the response correctly according to the structure of your API
        this.notifications = [
          ...response.new_events,
          ...response.upcoming_events,
          ...response.user_attended_events,
        ];
        console.log('Notifications:', this.notifications);
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      },
    });
  }
}
