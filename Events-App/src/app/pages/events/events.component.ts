import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { EventsService } from '../../services/events.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule , HttpClientModule , RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
constructor(private _EventsService:EventsService){}


events:any[]=[]

ngOnInit(): void {
  this._EventsService.getEvents().subscribe(
    {
      next:(response) =>{
            this.events = response;
      }
    })
}

} 
