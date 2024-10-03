import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink,TranslateModule],
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string | null = null; // To store success messages
  errorMessage: string | null = null; // To store error messages

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$'),
        ]),
        password_confirmation: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('password_confirmation')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const password_confirmation = group.get('password_confirmation')?.value;
    return password === password_confirmation ? null : { mustMatch: true };
  }

  // Handle form submission
  async register() {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        password_confirmation: this.registerForm.value.password_confirmation,
      };

      try {
        const response = await this.authService
          .userRegister(
            user.name,
            user.email,
            user.password,
            user.password_confirmation
          )
          .toPromise();
        alert('User registered successfully', );
        this.successMessage = 'Registration successful! Please check your email for confirmation.';
        this.errorMessage = ''; // Clear any previous error message
        this.router.navigate(['/']);
      } catch (error: any) {
        // Handle the error and set the error message
        console.error('Error during registration', error);
        this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
        this.successMessage = ''; // Clear any previous success message
      }
    } else {
      // Mark all controls as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }


  alreadyHaveAccount() {
    this.router.navigate(['/login']);
  }
}
