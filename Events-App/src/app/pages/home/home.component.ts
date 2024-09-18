import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  events = [
    {
      name: 'Live Rock Concert',
      image: 'https://via.placeholder.com/800x400?text=Live+Rock+Concert',
    },
    {
      name: 'Jazz Night',
      image: 'https://via.placeholder.com/800x400?text=Jazz+Night',
    },
    {
      name: 'Classical Symphony',
      image: 'https://via.placeholder.com/800x400?text=Classical+Symphony',
    },
  ];

  bookEvent(event: any) {
    console.log(`Booking event: ${event.name}`);
  }
}
