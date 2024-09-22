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
      .post<any>('http://your-backend-url/api/login', { email, password })
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

//include in appController
// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class AuthController extends Controller
// {
//     public function login(Request $request)
//     {
//         $credentials = $request->only('email', 'password');

//         if (Auth::attempt($credentials)) {
//             $user = Auth::user();
//             $token = $user->createToken('API Token')->accessToken;

//             return response()->json([
//                 'token' => $token,
//                 'user' => $user
//             ], 200);
//         }

//         return response()->json(['error' => 'Invalid credentials'], 401);
//     }
// }

//Ensure that your Laravel backend supports CORS, so your Angular frontend can communicate with it. You can configure CORS in app/Http/Middleware/VerifyCsrfToken.php.
//route/api.php
// use App\Http\Controllers\AuthController;

// Route::post('/login', [AuthController::class, 'login']);
