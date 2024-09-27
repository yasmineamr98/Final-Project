import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Fix here: import Router
import { UsersService } from '../../services/users.service'; // Ensure the correct path

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterLink,],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Fix here: Inject Router into constructor
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get the user ID from the URL
    const urlUserId = this.route.snapshot.paramMap.get('id');

    // Get the logged-in user's ID from AuthService
    this.userId = this.authService.getUserId();

    // Check if the logged-in user is trying to access their own profile
    if (urlUserId !== this.userId) {
      // Redirect to an unauthorized page or homepage
      this.fetchUserProfile(this.userId!);
    } else {
      // Fetch user profile if the IDs match
      this.router.navigate(['/']); // Redirect to homepage if unauthorized
    }
  }

  fetchUserProfile(id: string) {
    this.usersService.getUserById(id).subscribe(
      (data) => {
        this.user = data; // Assign the fetched user data to the component's user property
        console.log('Fetched User Profile:', this.user); // Debug: Log the fetched user data
      },
      (error) => {
        console.error('Error fetching user profile:', error); // Debug: Handle error
      }
    );
  }

  goToUserSettings() {
    this.router.navigate(['/user-settings', this.userId]); // Navigate to user settings page
  }
}
