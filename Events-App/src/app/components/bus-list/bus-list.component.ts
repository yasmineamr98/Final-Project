import { Component, OnInit } from '@angular/core';
import { BusService, Bus } from '../../services/bus.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-bus-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, RouterModule],
    templateUrl: './bus-list.component.html',
    styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {
    buses: Bus[] = [];

    constructor(private busService: BusService) {}

    ngOnInit(): void {
        this.fetchBuses();
    }

    fetchBuses(): void {
        this.busService.getBuses().subscribe(
            (data) => {
                this.buses = data;
            },
            (error) => {
                console.error('Error fetching buses:', error);
            }
        );
    }
}
