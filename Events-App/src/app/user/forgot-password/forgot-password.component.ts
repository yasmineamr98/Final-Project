import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    TranslateModule
  ],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.sendOtp(this.forgotPasswordForm.value.email).subscribe(
        (response) => {
          alert('OTP sent successfully!');
        },
        (error) => {
          console.error(error);
          alert('Error sending OTP');
        }
      );
    }
  }

  onSubmit() {
    this.forgotPassword();
    this.router.navigate(['/otp-verification']);
  }
}
