import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  uploadInProgress: boolean = false;
  file!: File | null;
  uploadProgress: number = 0;
  uploadDone: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  backendUrl = 'http://127.0.0.1:8000/api/register'; // URL to your backend API

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mustMatch: true };
  }

  // Handle form submission
  async register() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.registerForm.value.firstName);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
      // if (this.file) {
      //   formData.append('profilePic', this.file);
      // }

      this.http.post(this.backendUrl, formData).subscribe(
        (response) => {
          this.router.navigate(['/user-profile']);
          console.log('Registration successful', response);
          this.router.navigate(['/login']); // Redirect to login page or another route after successful registration
        },
        (error: HttpErrorResponse) => {
          console.error('Error during registration', error);
          // Handle registration error, show error message, etc.
        }
      );
    } else {
      // Mark all controls as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }







  // Handle file selection for image upload
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file && file.type.startsWith('image/')) {
  //     this.file = file;

  // Image preview logic
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreviewUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     console.error('Selected file is not an image.');
  //   }
  // }

  //   removeImage() {
  //     this.imagePreviewUrl = null;
  //     this.file = null;
  //     this.registerForm.get('image')?.reset();
  //   }
  // }
}
