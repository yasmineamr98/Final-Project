import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserLoginComponent,
    FooterComponent,
    HeaderComponent,
    UserRegisterComponent,
    AdminLoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Events-App';
}
