import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service'; // Adjust the path
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UserSettingsComponent implements OnInit {
  userId: string | null = null;
  user: any = {};
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService,
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
        this.user = data;
        console.log('Fetched User Profile:', this.user); // Debug: Ensure data is fetched
      },
      (error) => {
        this.errorMessage = 'Error fetching user profile.';
        console.error('Error fetching user profile:', error); // Debug: Handle error
      }
    );
  }

  // Method to handle user profile update
  // Method to handle user profile update
updateUserProfile() {
  if (!sessionStorage.getItem('authToken')) {
    console.error('Authentication token is not defined.');
    this.errorMessage = 'Authentication token is not defined.';
    return;
  }

  console.log('Updating user profile with data:', this.user); // Debug: Log user data
  this.usersService.updateUserProfileWithToken(sessionStorage.getItem('authToken')?? '', this.user).subscribe(
    (response: any) => {
      if (response && response.token) {
        sessionStorage.setItem('authToken', response.token); // Update the token in storage
        return { token: response.token };
      } else {
        console.error('Authentication token not found in response.');
        return null;
      }
    },
    (error: any) => {
      if (error.error && error.error.errors) {
        // Show all validation errors
        this.errorMessage = Object.values(error.error.errors)
          .flat()
          .join(', ');
      } else {
        this.errorMessage = 'Error updating profile.';
      }
      console.error('Error updating profile:', error); // Debug: Log error response
    }
  );
}

  handleProfileImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      this.usersService.uploadProfileImage(this.userId!, formData).subscribe(
        (response) => {
          alert('Profile image updated successfully');
          console.log('Image upload response:', response); // Debug: Ensure image upload is successful
          window.location.reload(); // Reload page to reflect new image
        },
        (error) => {
          this.errorMessage = 'Error uploading profile image.';
          console.error('Error uploading profile image:', error); // Debug: Log image upload error
        }
      );
    }
  }
}
