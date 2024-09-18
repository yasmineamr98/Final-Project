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
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Add CommonModule for directives like *ngIf
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
// import { NgxImageCompressService } from 'ngx-image-compress';
import {
  handleFileInput,
  // dataURItoBlob,
} from '../user-register/image-helper/imageHelp';
import { async } from 'rxjs';

@Component({
  selector: 'app-user-register',
  standalone: true, // Make this component standalone
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Import CommonModule for common Angular directives
})
export class UserRegisterComponent implements OnInit {
  register() {
    throw new Error('Method not implemented.');
  }
  registerForm: FormGroup;
  uploadInProgress: boolean = false;
  file!: File | null;
  uploadProgress: number = 0;
  uploadDone: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string;
  };
  imageCompress: any;
  //user: User; // Declare a variable of type User

  constructor(
    private fb: FormBuilder,
    private router: Router // private UserService: UserService, // private imageCompress: NgxImageCompressService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
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

    // Initialize the user instance
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profilePic: '',
    };
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mustMatch: true };
  }

  //   onFileSelected(event: any) {
  //     const file = event.target.files[0];
  //     this.file = file;

  //     if (file) {
  //       const fileType = file.type;

  //       // Ensure the selected file is an image
  //       if (fileType.startsWith('image/')) {
  //         this.uploadInProgress = true;
  //         this.uploadDone = false;
  //         this.uploadProgress = 0;
  //         // Show image preview
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           this.imagePreviewUrl = reader.result;
  //         };
  //         reader.readAsDataURL(file);

  //         // Simulate upload progress
  //         let uploadInterval = setInterval(() => {
  //           if (this.uploadProgress < 100) {
  //             this.uploadProgress += 5; // Increment progress (adjust as needed)
  //           } else {
  //             clearInterval(uploadInterval);
  //             this.uploadDone = true; // Mark upload as done
  //             this.uploadInProgress = false;
  //           }
  //         }, 100); // Adjust interval time as needed

  //         // Compress image
  //         reader.onloadend = (e: any) => {
  //           const image = e.target.result;
  //           this.imageCompress.compressFile(image, -1, 50, 50).then(
  //             (compressedImage: string) => {
  //               const compressedBlob = dataURItoBlob(compressedImage);

  //               // Convert Blob to File
  //               this.file = new File([compressedBlob], file.name, {
  //                 type: file.type,
  //                 lastModified: file.lastModified,
  //               });

  //               // After compression, complete the progress
  //               setTimeout(() => {
  //                 this.uploadProgress = 100;
  //                 clearInterval(uploadInterval);
  //                 this.uploadDone = true;
  //                 this.uploadInProgress = false;
  //               }, 1000); // Wait a bit before marking as done, for a smoother UI experience
  //             },
  //             (error: any) => {
  //               console.error('Image compression failed:', error);
  //               this.uploadInProgress = false;
  //             }
  //           );
  //         };
  //       }
  //     }
  //   }
  // }
  // function dataURItoBlob(this: any, compressedImage: string) {
  //   throw new Error('Function not implemented.');

  //   async register() {
  //     if (this.registerForm.valid) {
  //       this.user = {
  //         firstName: this.registerForm.value.firstName,
  //         lastName: this.registerForm.value.lastName,
  //         email: this.registerForm.value.email,
  //         password: this.registerForm.value.password,
  //         profilePic: await handleFileInput(this.file!),
  //       };

  //       // Perform registration logic here
  //       this.UserService.createUser(this.user).then((response: { token: string; })=>{
  //         console.log(response);
  //         if (response) {
  //           sessionStorage.setItem("token",response.token);
  //           this.router.navigate(['main/']);
  //         }
  //       })
  //     } else {
  //       Object.keys(this.registerForm.controls).forEach((controlName) => {
  //         const control = this.registerForm.get(controlName);
  //         if (control?.invalid) {
  //           console.log(`Control ${controlName} is invalid:`);
  //           console.log(control.errors);
  //         }
  //       });
  //       console.log('Form is invalid');
  //     }
  //   }

  //   removeImage() {
  //     this.imagePreviewUrl = null;
  //     this.file = null;
  //     this.uploadDone = false;
  //     this.uploadProgress = 0;

  //     // Optionally, clear the file input field
  //     this.registerForm.get('image')?.reset();
  //   }
  // }
  // function removeImage() {
  //   throw new Error('Function not implemented.');
  // }
}
