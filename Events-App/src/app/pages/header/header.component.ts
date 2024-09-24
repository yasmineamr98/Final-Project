import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Adjust the path if needed

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Update if necessary
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

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
}
