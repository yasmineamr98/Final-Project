import { Routes } from '@angular/router';
import { UserLoginComponent } from '../app/user/user-login/user-login.component';
import { UserRegisterComponent } from '../app/user/user-register/user-register.component';
import { UserHomepageComponent } from './user/user-homepage/user-homepage.component';
import { UserNotificationComponent } from './user/user-notification/user-notification.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { EventsComponent } from './pages/events/events.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard'; // Import the guard
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './user/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

export const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-homepage', component: UserHomepageComponent },
  { path: 'user-notification', component: UserNotificationComponent },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'user-settings/:id',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-otp', component: OtpVerificationComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: '', redirectTo: '/forgot-password', pathMatch: 'full' },
  { path: 'reset-password', component: ResetPasswordComponent },
];
