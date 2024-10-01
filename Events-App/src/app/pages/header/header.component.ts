import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Adjust the path if needed
import { TranslateService, TranslateModule } from '@ngx-translate/core'; // Import TranslateService and TranslateModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Update if necessary
})
export class HeaderComponent {
  currentLang: string;

  constructor(private router: Router, private authService: AuthService, private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Use browser language
    const browserLang = this.translate.getBrowserLang();
    this.currentLang = browserLang?.match(/en|ar/) ? browserLang : 'en';
    this.translate.use(this.currentLang);  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Use AuthService to check if the user is logged in
  }

  logout() {
    this.authService.logout(); // Call logout method from AuthService
    this.router.navigate(['/home']); // Redirect to home after logout
  }

  getUserId(): string | null {
    const user = JSON.parse(sessionStorage.getItem('User') || '{}');
    return user?.id;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);
  }
}
