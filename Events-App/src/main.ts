// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes'; // Import the routes from app.routes.ts
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { importProvidersFrom } from '@angular/core';

const appConfig = {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Register the routes here
      HttpClientModule
    )
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));