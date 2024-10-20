import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding
import { CommonModule } from '@angular/common'; // CommonModule for standalone components
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    TranslateModule,
  ], // Import FormsModule and CommonModule
})
export class UserLoginComponent {
  email: string = ''; // Bind to ngModel for email
  password: string = ''; // Bind to ngModel for password
  errorMessage: string = ''; // For showing error messages
  successMessage: string = ''; // For showing success messages

  constructor(private authService: AuthService, private router: Router) {}

  // Method to handle login
  login() {
    this.authService.userLogin(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        if (response && response.token) {
          // Store token and user details in sessionStorage
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('User', JSON.stringify(response.user)); // Store user as JSON

          // Set success message
          this.successMessage = 'Login successful! Redirecting...';
          this.errorMessage = ''; // Clear any previous error messages

          // Redirect to user profile page after a short delay
          setTimeout(() => {
            this.router.navigate(['/user-profile', response.user.id]);
          },500); // Optional: wait 1.5 seconds before redirect
        } else {
          this.errorMessage = 'Invalid credentials or unauthorized access';
          this.successMessage = ''; // Clear any previous success messages
        }
      },
      (error: any) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = ''; // Clear any previous success messages
      }
    );
  }
}
