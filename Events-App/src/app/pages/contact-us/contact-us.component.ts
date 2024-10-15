import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient and HttpClientModule
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule] // Include HttpClientModule
})
export class ContactUsComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize form with FormBuilder
    this.contactForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.contactForm.valid) {
      // If form is valid, call sendContactForm to make API request
      this.sendContactForm(this.contactForm.value).subscribe({
        next: (response: any) => {
          this.successMessage = 'Message sent successfully!'; // Set success message
          this.errorMessage = null;
          this.contactForm.reset(); // Optionally reset the form
        },
        error: (error: any) => {
          this.errorMessage = 'Failed to send message. Please try again later.'; // Set error message
          this.successMessage = null;
          console.error('Error occurred:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to send contact form data to the backend
  private sendContactForm(formData: any): Observable<any> {
    const apiUrl = 'http://127.0.0.1:8000/api/contacts'; // Your API endpoint
    return this.http.post(apiUrl, formData); // Send POST request to the backend
  }
}
