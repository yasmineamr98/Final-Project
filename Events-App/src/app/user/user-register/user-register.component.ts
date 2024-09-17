// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   FormControl,
// } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// // // import { NgxImageCompressService } from 'ngx-image-compress';
// // // import  {handleFileInput, dataURItoBlob} from '../../shared/helpers/Image64.helper';

// @Component({
//   selector: 'app-user-register',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './user-register.component.html',
//   styleUrl: './user-register.component.css',
// })
// export class UserRegisterComponent implements OnInit {
//   registerForm!: FormGroup;
//   uploadInProgress: boolean = false;
//   uploadProgress: number = 0;
//   uploadDone: boolean = false;
//   imagePreviewUrl: string | ArrayBuffer | null = null;
//   selectedFile: File | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.registerForm = this.fb.group(
//       {
//         firstName: ['', Validators.required],
//         lastName: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         password: [
//           '',
//           [
//             Validators.required,
//             Validators.pattern(
//               '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
//             ), // At least 1 lowercase, 1 uppercase, 1 digit, 1 special character, min 8 characters
//           ],
//         ],
//         confirmPassword: ['', Validators.required],
//         image: [null, Validators.required],
//       },
//       {
//         validator: this.mustMatch('password', 'confirmPassword'), // Custom validator for matching passwords
//       }
//     );
//   }

//   // Custom validator to check if passwords match
//   mustMatch(password: string, confirmPassword: string) {
//     return (formGroup: FormGroup) => {
//       const passControl = formGroup.controls[password];
//       const confirmPassControl = formGroup.controls[confirmPassword];

//       if (
//         confirmPassControl.errors &&
//         !confirmPassControl.errors['mustMatch']
//       ) {
//         return;
//       }

//       if (passControl.value !== confirmPassControl.value) {
//         confirmPassControl.setErrors({ mustMatch: true });
//       } else {
//         confirmPassControl.setErrors(null);
//       }
//     };
//   }

//   // Handle file selection
//   onFileSelected(event: Event): void {
//     const fileInput = event.target as HTMLInputElement;
//     if (fileInput.files && fileInput.files[0]) {
//       this.selectedFile = fileInput.files[0];

//       // Image Preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreviewUrl = reader.result;
//       };
//       reader.readAsDataURL(this.selectedFile);
//     }
//   }

//   // Remove selected image
//   removeImage(): void {
//     this.selectedFile = null;
//     this.imagePreviewUrl = null;
//     this.registerForm.patchValue({ image: null });
//   }

//   // Submit the form and send data to Laravel backend
//   register(): void {
//     if (this.registerForm.invalid) {
//       this.registerForm.markAllAsTouched();
//       return;
//     }

//     // Start uploading
//     this.uploadInProgress = true;
//     const formData = new FormData();
//     formData.append('firstName', this.registerForm.get('firstName')?.value);
//     formData.append('lastName', this.registerForm.get('lastName')?.value);
//     formData.append('email', this.registerForm.get('email')?.value);
//     formData.append('password', this.registerForm.get('password')?.value);
//     formData.append('image', this.selectedFile as File);

//     // Send data to Laravel API
//     //   this.http
//     //     .post('http://your-laravel-api-url.com/api/register', formData, {
//     //       reportProgress: true,
//     //       observe: 'events',
//     //     })
//     //     .subscribe({
//     //       next: (event: any) => {
//     //         // Monitor progress
//     //         if (event.type === HttpEventType.UploadProgress) {
//     //           this.uploadProgress = Math.round(
//     //             (100 * event.loaded) / event.total!
//     //           );
//     //         } else if (event.type === HttpEventType.Response) {
//     //           this.uploadInProgress = false;
//     //           this.uploadDone = true;

//     //           // Redirect to login after successful registration
//     //           this.router.navigate(['/login']);
//     //         }
//     //       },
//     //       error: (error) => {
//     //         this.uploadInProgress = false;
//     //         console.error('Registration failed:', error);
//     //       },
//     //     });
//     // }
//   }
// }

////////// new code trial
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Add CommonModule for directives like *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-user-register',
  standalone: true, // Make this component standalone
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // Import CommonModule for common Angular directives
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  uploadProgress = 0;
  uploadInProgress = false;
  uploadDone = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        image: ['', Validators.required],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreviewUrl = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    this.registerForm.get('image')?.reset();
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.registerForm.get('firstName')?.value);
    formData.append('lastName', this.registerForm.get('lastName')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.uploadInProgress = true;
    this.http
      .post('http://your-laravel-backend-url/api/register', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress = Math.round(
                100 * (event.loaded / event.total)
              );
            }
          } else if (event.type === HttpEventType.Response) {
            this.uploadDone = true;
            this.uploadInProgress = false;
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.uploadInProgress = false;
        },
      });
  }
}
