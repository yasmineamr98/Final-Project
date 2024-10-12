import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  imports: [CommonModule, FormsModule,TranslateModule],
})
export class UserSettingsComponent implements OnInit {
  userId: string | null = null;
  user: any = {};
  errorMessage: string = '';

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
        this.errorMessage = 'Error fetching user profile.';
        console.error('Error fetching user profile:', error);
      }
    );
  }

  updateUserProfile() {
    if (!sessionStorage.getItem('authToken')) {
      this.errorMessage = 'Authentication token is not defined.';
      return;
    }

    const updatedUser = {
      name: this.user.name,
      email: this.user.email,
      location: this.user.location,
      gender: this.user.gender,
      bio: this.user.bio,
      birth_date: this.user.birth_date
    };

    // Log the updated user data
    console.log('Updated User Data:', updatedUser);

    this.usersService.updateUserProfileWithToken(sessionStorage.getItem('authToken') ?? '', updatedUser).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        alert('Profile updated successfully');
      },
      (error) => {
        // Log the error response for debugging
        console.error('Error updating profile:', error);
        this.errorMessage = error.error?.message || 'Error updating profile.';
        // Additionally, log the error details if available
        if (error.error) {
          console.error('Validation Errors:', error.error.errors);
        }
      }
    );
  }



}
