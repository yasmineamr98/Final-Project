import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserHomepageComponent } from './user/user-homepage/user-homepage.component';
import { UserNotificationsComponent } from './user/user-notifications/user-notifications.component';
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
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from './translate-config.module';
import { TranslateModule } from '@ngx-translate/core'; // Add this line
import { LoadingOverlayComponent } from '../app/shared/loading-overlay/loading-overlay.component'; // Adjust the path as necessary

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
    UserNotificationsComponent,
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
    TranslateConfigModule,
    TranslateModule,
    LoadingOverlayComponent
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
  isLoading: boolean = false; // Control loading state
    // Inject TranslateService
    constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('en');

    // Get the saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');

    // Use the saved language or the browser language, fallback to 'en' if not found
    const browserLang = savedLanguage || this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');

    }
    // loadData() {
    //   this.isLoading = true; // Set loading to true
    //   // Simulate a data load with a timeout
    //   setTimeout(() => {
    //     this.isLoading = false; // Set loading to false after data is loaded
    //   }, 3000); // Replace with actual data loading logic
    // }

}

