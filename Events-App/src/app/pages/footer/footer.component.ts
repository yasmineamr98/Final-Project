import { Component } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SubscribeService } from '../../services/subscribe.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  subscribeForm: FormGroup;
  subscriptionSuccess = false;
  subscriptionError = false;

  constructor(
    private subscribeService: SubscribeService,
    private formBuilder: FormBuilder
  ) {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      const email = this.subscribeForm.get('email')?.value;

      this.subscribeService.subscribeUser(email).subscribe(
        (response) => {
          this.subscriptionSuccess = true;
          this.subscriptionError = false;
          this.subscribeForm.reset();
        },
        (error) => {
          this.subscriptionError = true;
          this.subscriptionSuccess = false;
          console.error('Subscription failed', error);
        }
      );
    }
  }
}
