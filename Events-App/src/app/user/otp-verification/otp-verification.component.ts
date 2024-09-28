import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  templateUrl: './otp-verification.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  otpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Use the same email entered earlier
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      this.authService.verifyOtp(this.otpForm.value).subscribe(
        (response) => {
          alert('OTP verified successfully! You can now reset your password.');
          this.router.navigate(['/reset-password']); // Navigate to the reset password page
        },
        (error) => {
          alert('Invalid or expired OTP');
        }
      );
    }
  }

  onSubmit() {
    this.verifyOtp();
    this.router.navigate(['/reset-password']);
  }
}
