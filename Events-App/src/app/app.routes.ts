import { Routes } from '@angular/router';
import { UserLoginComponent } from '../app/user/user-login/user-login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRegisterComponent } from '../app/user/user-register/user-register.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

export const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user-register', component: UserRegisterComponent },

  { path: 'admin-login', component: AdminLoginComponent },
];
