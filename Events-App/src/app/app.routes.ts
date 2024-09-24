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

export const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent }, // Login route
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-homepage', component: UserHomepageComponent },
  { path: 'user-notification', component: UserNotificationComponent },
  { path: 'user-profile/:id', component: UserProfileComponent }, // User profile route
  { path: 'event-details', component: EventDetailsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'search', component: SearchComponent },
];
