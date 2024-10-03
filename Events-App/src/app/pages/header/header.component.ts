import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Adjust the path if needed
import { TranslateService, TranslateModule } from '@ngx-translate/core'; // Import TranslateService and TranslateModule
import { NotificationsService } from '../../services/notifications.service';
import { AppComponent } from '../../app.component';
// '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
interface Notification {
  id: number; // Adjust according to your actual data structure
  name: string; // Name or title of the notification
  description: string; // Description of the notification
  date: string; // Date or time of the notification
}

interface NotificationsResponse {
  new_events: Notification[];
  upcoming_events: Notification[];
  user_attended_events: Notification[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,TranslateModule, AppComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Update if necessary
})
export class HeaderComponent {
  currentLang: string;
  isLoading: boolean = false; // Property to track loading state
  searchQuery: string = ''; // New property to hold the search query

  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private notificationsService: NotificationsService
  ) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Use browser language
    const browserLang = this.translate.getBrowserLang();
    this.currentLang = browserLang?.match(/en|ar/) ? browserLang : 'en';
    this.translate.use(this.currentLang);
    // Set the direction based on the current language
    this.setDirection(this.currentLang);
  }
  notificationCount: number = 0;
  notifications: Notification[] = []; // Initialize notifications array
  showDropdown: boolean = false; // Initialize showDropdown

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.loadNotifications();
      this.loadNotificationCount(); // Load notification count on init
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Use AuthService to check if the user is logged in
  }

  logout() {
    this.authService.logout(); // Call logout method from AuthService
    this.router.navigate(['/home']); // Redirect to home after logout
  }

  getUserId(): string | null {
    const user = JSON.parse(sessionStorage.getItem('User') || '{}');
    return user?.id;
  }

  loadNotifications() {
    this.notificationsService.getNotifications().subscribe({
      next: (response: NotificationsResponse) => {
        // Type the response
        this.notifications = [
          ...response.new_events,
          ...response.upcoming_events,
          ...response.user_attended_events,
        ];
        this.notificationCount = this.notifications.length; // Count notifications
        sessionStorage.setItem(
          'notificationCount',
          String(this.notificationCount)
        ); // Update session storage

        // Clear notifications if there are none
        if (this.notificationCount === 0) {
          this.notifications = []; // Clear notifications
          this.showDropdown = false; // Optionally hide the dropdown
        }
      },

      error: (error) => {
        console.error('Error loading notifications:', error);
      },
    });
  }

  loadNotificationCount() {
    const storedCount = sessionStorage.getItem('notificationCount');
    if (storedCount) {
      this.notificationCount = Number(storedCount); // Load count from sessionStorage
    }
  }

  resetNotificationCount() {
    // Always reset count to 0 on component init
    this.notificationCount = 0;
    sessionStorage.setItem('notificationCount', '0'); // Store count as zero
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown; // Toggle dropdown visibility
    if (this.showDropdown) {
      this.clearNotificationCount(); // Reset count when opening dropdown
    }
  }

  clearNotificationCount() {
    this.notificationCount = 0; // Reset notification count
    sessionStorage.setItem('notificationCount', '0'); // Store count in sessionStorage
  }

  goToEventDetails(eventId: number) {
    // Navigate to the event details page using the event ID
    this.router.navigate(['/event-details', eventId]); // Adjust the route as necessary
  }

  switchLanguage(language: string) {

    // Use the selected language for translations
    this.translate.use(language);

    // Update the 'lang' attribute for accessibility
    document.documentElement.lang = language;

    // Determine the direction (RTL or LTR) based on the selected language
    const direction = language === 'ar' ? 'rtl' : 'ltr';

    // Update the 'dir' attribute for the document and body
    document.documentElement.dir = direction;
    document.body.dir = direction;

    // Save the language and direction settings in local storage if needed
    localStorage.setItem('language', language);
    localStorage.setItem('direction', direction);

    // Optional: You can reload the page to ensure the changes take effect everywhere
    window.location.reload();
    // Simulate a data load with a timeout
  }
  setDirection(language: string) {
    console.log(`Setting direction for language: ${language}`);
    const direction = language === 'ar' ? 'rtl' : 'ltr';

    // Set the `dir` attribute for text direction
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);

    // Apply a global class to the body for RTL or LTR styles
    const body = document.body;
    if (direction === 'rtl') {
      body.classList.add('rtl');
      body.classList.remove('ltr');
    } else {
      body.classList.add('ltr');
      body.classList.remove('rtl');
    }
  }

  toggleLanguage() {
    this.isLoading = true; // Show loader

    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);
    this.setDirection(this.currentLang);
    setTimeout(() => {
      this.isLoading = false; // Set loading to false after data is loaded
    }, 3000);
  }

    // New method to handle search
    search() {
      if (this.searchQuery.trim()) {
        this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      }
    }
  
}
