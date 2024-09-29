import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  providers: [Router],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [
        '',
        [Validators.required, this.mustMatch('password')],
      ],
    });
  }

  mustMatch(controlName: string) {
    return (formControl: FormControl) => {
      const control = formControl.parent?.get(controlName);
      if (control && control.value !== formControl.value) {
        return { mustMatch: true };
      }
      return null;
    };
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService
        .resetPassword(this.resetPasswordForm.value)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/user-login']);
        });
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.resetPassword();
      setTimeout(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/user-login']);
        }
      });
    }
  }


}
