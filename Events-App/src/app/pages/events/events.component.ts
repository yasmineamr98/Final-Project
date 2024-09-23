import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule , HttpClientModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  
  events = [
    {
      id: 1,
      name: 'Film My Design 3rd Edition Festival',
      date: '12 OCT',
      location: 'Zawya Cinema',
      imageUrl: 'https://collard-production.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/08/12174201/WhatsApp-Image-2024-08-07-at-17.30.05_ae129be2.jpg', // Use the actual image path
      description: 'Designing our lives for a better future',
    },
    {
      id: 2,
      name: 'Art D\'Egypte Bus Tour',
      date: '24 OCT - 16 NOV',
      location: 'The Great Pyramid of Giza',
      imageUrl: 'https://collard-production.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/08/12174201/WhatsApp-Image-2024-08-07-at-17.30.05_ae129be2.jpg', // Use the actual image path
      
      description: 'Forever is Now - 4th Edition',
    },
    {
      id: 2,
      name: 'Art D\'Egypte Bus Tour',
      date: '24 OCT - 16 NOV',
      location: 'The Great Pyramid of Giza',
      imageUrl: 'https://collard-production.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/08/12174201/WhatsApp-Image-2024-08-07-at-17.30.05_ae129be2.jpg', // Use the actual image path
    
      description: 'Forever is Now - 4th Edition',
    },
    {
      id: 2,
      name: 'Art D\'Egypte Bus Tour',
      date: '24 OCT - 16 NOV',
      location: 'The Great Pyramid of Giza',
      imageUrl: 'https://collard-production.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/08/12174201/WhatsApp-Image-2024-08-07-at-17.30.05_ae129be2.jpg', // Use the actual image path
    
      description: 'Forever is Now - 4th Edition',
    },
    {
      id: 2,
      name: 'Art D\'Egypte Bus Tour',
      date: '24 OCT - 16 NOV',
      location: 'The Great Pyramid of Giza',
      imageUrl: 'https://collard-production.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/08/12174201/WhatsApp-Image-2024-08-07-at-17.30.05_ae129be2.jpg', // Use the actual image path
      
      description: 'Forever is Now - 4th Edition',
    },
    {
      id: 2,
      name: 'Art D\'Egypte Bus Tour',
      date: '24 OCT - 16 NOV',
      location: 'The Great Pyramid of Giza',
      imageUrl: 'https://i.imgur.com/NZ5tA7m.jpg',
      description: 'Forever is Now - 4th Edition',
    },
  ];
}
