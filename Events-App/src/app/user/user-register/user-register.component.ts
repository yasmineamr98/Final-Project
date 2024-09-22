////////// new code trial
// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   FormControl,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient, HttpEventType } from '@angular/common/http';
// import { CommonModule } from '@angular/common'; // Add CommonModule for directives like *ngIf
// import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
// // import { NgxImageCompressService } from 'ngx-image-compress';
// import {
//   handleFileInput,
//   // dataURItoBlob,
// } from '../user-register/image-helper/imageHelp';
// import { async } from 'rxjs';

// @Component({
//   selector: 'app-user-register',
//   standalone: true, // Make this component standalone
//   templateUrl: './user-register.component.html',
//   styleUrls: ['./user-register.component.css'],
//   imports: [CommonModule, FormsModule, ReactiveFormsModule], // Import CommonModule for common Angular directives
// })
// export class UserRegisterComponent implements OnInit {
//   register() {
//     throw new Error('Method not implemented.');
//   }
//   registerForm: FormGroup;
//   uploadInProgress: boolean = false;
//   file!: File | null;
//   uploadProgress: number = 0;
//   uploadDone: boolean = false;
//   imagePreviewUrl: string | ArrayBuffer | null = null;
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     profilePic: string;
//   };
//   imageCompress: any;
//   //user: User; // Declare a variable of type User

//   constructor(
//     private fb: FormBuilder,
//     private router: Router // private UserService: UserService, // private imageCompress: NgxImageCompressService
//   ) {
//     this.registerForm = this.fb.group(
//       {
//         firstName: new FormControl('', [
//           Validators.required,
//           Validators.minLength(2),
//         ]),
//         lastName: new FormControl('', [
//           Validators.required,
//           Validators.minLength(2),
//         ]),
//         email: new FormControl('', [Validators.required, Validators.email]),
//         password: new FormControl('', [
//           Validators.required,
//           Validators.pattern(
//             '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
//           ),
//         ]),
//         confirmPassword: new FormControl('', [Validators.required]),
//         image: new FormControl('', [Validators.required]),
//       },
//       { validators: this.passwordMatchValidator }
//     );

//     // Initialize the user instance
//     this.user = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       profilePic: '',
//     };
//   }

//   ngOnInit() {
//     this.registerForm.get('password')?.valueChanges.subscribe(() => {
//       this.registerForm.get('confirmPassword')?.updateValueAndValidity();
//     });
//   }

// passwordMatchValidator(g: FormGroup) {
//   return g.get('password')?.value === g.get('confirmPassword')?.value
//     ? null
//     : { mustMatch: true };
// }

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
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse , HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule , HttpClientModule],
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  uploadInProgress: boolean = false;
  file!: File | null;
  uploadProgress: number = 0;
  uploadDone: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;

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

  // Handle form submission
  register() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.registerForm.get('firstName')?.value);
      formData.append('last_name', this.registerForm.get('lastName')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('profilePic', this.file!);

      // This is where you make an API call, for now we'll log form values.
      console.log('Form data ready to be sent:', formData);
    } else {
      console.log('Form is invalid');
      Object.keys(this.registerForm.controls).forEach((controlName) => {
        const control = this.registerForm.get(controlName);
        if (control?.invalid) {
          console.log(`Control ${controlName} is invalid:`, control.errors);
        }
      });
    }
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.file = file;

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Selected file is not an image');
    }
  }

  // Remove image from preview and reset file
  removeImage() {
    this.imagePreviewUrl = null;
    this.file = null;
    this.registerForm.get('image')?.reset();
  }
}



//backend routes///////////////////////////////////////////////////////////////////////

// use Illuminate\Http\Request;
// use App\Models\User;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Storage;

// Route::post('/api/register', function (Request $request) {
//     $request->validate([
//         'first_name' => 'required|string|max:255',
//         'last_name' => 'required|string|max:255',
//         'email' => 'required|string|email|max:255|unique:users',
//         'password' => 'required|string|min:8|confirmed',
//         'profilePic' => 'required|image|max:2048',
//     ]);

//     // Handle file upload
//     $filePath = $request->file('profilePic')->store('profile_pics', 'public');

//     $user = User::create([
//         'first_name' => $request->first_name,
//         'last_name' => $request->last_name,
//         'email' => $request->email,
//         'password' => Hash::make($request->password),
//         'profile_pic' => $filePath,
//     ]);

//     return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
// });
