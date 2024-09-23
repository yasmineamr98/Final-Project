import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [HttpClientModule], // Import HttpClientModule
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  // Inject HttpClient and Router in constructor
  constructor(private http: HttpClient, private router: Router) {}

  // Handle form submission and send data to the backend
  onSubmit($event: Event, form: HTMLFormElement) {
    $event.preventDefault();

    const email = form['email'].value;
    const password = form['password'].value;

    // Send data to the Laravel backend for authentication
    this.http
      .post<any>('http://127.0.0.1:8000/api/login', { email, password })
      .subscribe(
        (response) => {
          // Handle success response
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('User', JSON.stringify(response.user));

          // Redirect to another page (e.g., user profile or dashboard)
          this.router.navigate(['/user-profile']);
        },
        (error) => {
          // Handle error response
          console.error('Login failed:', error);
        }
      );
  }
}
