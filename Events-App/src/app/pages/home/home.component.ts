import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventsComponent } from '../events/events.component';
import { EventsService } from '../../services/events.service';
import { CalendarComponent } from '../../calendar/calendar.component'; // Import the CalendarComponent
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventsComponent, HttpClientModule, CalendarComponent, TranslateModule, CarouselModule] ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  categories: any[] = [];

  testcategories = [
    {
      name: 'Global',
      image: '../../../assets/images/3.jpg',
      description: 'VMware and Egypts ITI collaborate for skills development',
    },
    {
      name: 'Champions',
      image: '../../../assets/images/2.jpg',
      description: 'Zinad IT (Cyber champion) .',
    },
    {
      name: 'Schools',
      image: '../../../assets/images/5.jpg',
      description: 'International Public Schools – October 3 ',
    },
    {
      name: 'Software Companies',
      image: '../../../assets/images/8.jpeg',
      description: 'Explore what is goinig in the Software market',
    },
  ];
  // events = [
  //   {
  //     id: 'event1',
  //     image: 'assets/images/3.jpg',
  //     name: 'Summer Festival',
  //     place: 'Central Park',
  //     date: '2024-10-04',
  //     hover: false,
  //   },
  //   {
  //     id: 'event2',
  //     image: 'assets/images/4.jpg',
  //     name: 'Music Concert',
  //     place: 'Downtown Arena',
  //     date: '2024-11-15',
  //     hover: false,
  //   },
  //   {
  //     id: 'event3',
  //     image: 'assets/images/5.jpg',
  //     name: 'Art Exhibition',
  //     place: 'City Gallery',
  //     date: '2024-12-20',
  //     hover: false,
  //   },
  //   {
  //     id: 'event4',
  //     image: 'assets/images/6.jpg',
  //     name: 'Tech Conference',
  //     place: 'Silicon Valley',
  //     date: '2024-09-15',
  //     hover: false,
  //   },
  //   {
  //     id: 'event5',
  //     image: 'assets/images/7.jpg',
  //     name: 'Startup Meetup',
  //     place: 'New York',
  //     date: '2024-10-05',
  //     hover: false,
  //   },
  // ];
  events:any[]=[]

  // Pagination settings
  currentPage = 1;
  itemsPerPage = 2;

  constructor(private router: Router,private _EventsService:EventsService ) {}


  ngOnInit(): void {
    this._EventsService.getEvents().subscribe(
      {
        next:(response) =>{
              this.events = response;
        }
      })

      // get categories
      this._EventsService.getCategories().subscribe(
        {
          next:(response) =>{
                this.categories = response;
                console.log(this.categories);
                console.log(response);
                
                
          }

        }
      )
  }
  // Set hover state
  setHoverState(event: { hover: boolean }, isHovering: boolean) {
    event.hover = isHovering;
  }

  // Navigate to event details
  navigateToEventDetails(eventId: string) {
    this.router.navigate(['/Events-App/src/app/pages/event-details/', eventId]);
  }

  // Handle pagination
  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.events.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  totalPages() {
    return Math.ceil(this.events.length / this.itemsPerPage);
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

 


}
