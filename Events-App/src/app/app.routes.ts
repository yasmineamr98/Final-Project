import { Routes } from '@angular/router';
import { UserLoginComponent } from '../app/user/user-login/user-login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
