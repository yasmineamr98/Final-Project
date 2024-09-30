import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserHomepageComponent } from './user/user-homepage/user-homepage.component';
import { UserNotificationComponent } from './user/user-notification/user-notification.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventsComponent } from './pages/events/events.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './user/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppComponent,
    RouterOutlet,
    UserLoginComponent,
    FooterComponent,
    HeaderComponent,
    UserRegisterComponent,
    UserHomepageComponent,
    UserNotificationComponent,
    UserProfileComponent,
    UserSettingsComponent,
    EventDetailsComponent,
    EventsComponent,
    SearchComponent,
    HomeComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Events-App';
}
