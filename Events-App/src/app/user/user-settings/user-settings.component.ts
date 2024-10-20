import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule, RouterLink],
})
export class UserSettingsComponent implements OnInit {
  userId: string | null = null;
  user: any = {};
  errorMessage: string[] = []; // Change to array to handle multiple errors
  successMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.usersService.getUserById(this.userId!).subscribe(
      (data) => {
        this.user = data;
        console.log('Fetched User Profile:', this.user);
      },
      (error) => {
        this.errorMessage.push('Error fetching user profile.');
        console.error('Error fetching user profile:', error);
      }
    );
  }

  updateUserProfile() {
    this.errorMessage = []; // Clear previous errors

    if (!sessionStorage.getItem('authToken')) {
      this.errorMessage.push('Authentication token is not defined.');
      return;
    }

    const updatedUser = {
      name: this.user.name,
      email: this.user.email,
      location: this.user.location,
      gender: this.user.gender,
      bio: this.user.bio,
      birth_date: this.user.birth_date,
    };

    this.usersService.updateUserProfileWithToken(sessionStorage.getItem('authToken') ?? '', updatedUser).subscribe(
      (response) => {
        this.successMessage = 'Profile updated successfully';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/user-profile', this.userId]);
        }, 1000);
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage.push('Error updating profile.'); // General error message

        // If error details are available from the server, display them
        if (error.error && error.error.errors) {
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errorMessage.push(error.error.errors[key]);
            }
          }
        }
      }
    );
  }
}
