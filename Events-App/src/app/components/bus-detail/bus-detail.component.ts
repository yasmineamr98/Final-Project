import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BusService, Bus, Driver, Point } from '../../services/bus.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var L: any; // Declare Leaflet

@Component({
  selector: 'app-bus-detail',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css']
})
export class BusDetailComponent implements OnInit, AfterViewInit {
  bus: Bus | null = null;
  driver: Driver | null = null;
  points: Point[] = [];
  safeUrl: SafeResourceUrl | undefined;

  constructor(private busService: BusService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const busId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchBusDetails(busId);
  }

  fetchBusDetails(busId: number): void {
    this.busService.getCompleteBusDetails(busId).subscribe(
      (data) => {
        this.bus = data;
        this.driver = data.driver ?? null;
        this.points = data.points;
        console.log('Fetched Bus Data:', data);
        console.log('Points Data:', this.points);
        
        // Initialize the map here with a timeout to ensure the DOM is updated
        setTimeout(() => {
          this.initRouteMap(); // Initialize the map after data is fetched
        }, 0);
      },
      (error) => {
        console.error('Error fetching bus details:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    // This can be left empty now, as we're initializing the map in fetchBusDetails
  }

  getSafeUrl(latitude: number, longitude: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getPointLabel(index: number): string {
    const labels = ['First Point', 'Second Point', 'Third Point', 'Fourth Point', 'Fifth Point', 'Last Point'];
    return labels[index] || `Point ${index + 1}`;
  }

  initRouteMap(): void {
    if (!this.points || this.points.length === 0) {
      console.warn('No points available to display on the map.');
      return;
    }

    const initialLatitude = this.points[0]?.latitude || 0;
    const initialLongitude = this.points[0]?.longitude || 0;
    const mapContainer = document.getElementById('routeMap');

    if (!mapContainer) {
      console.error('Map container not found. Please check your HTML template.');
      return;
    }

    const map = L.map(mapContainer).setView([initialLatitude, initialLongitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const latlngs = this.points.map(point => [point.latitude, point.longitude]);

    // Add markers for each point
    latlngs.forEach(latlng => {
      L.marker(latlng).addTo(map);
    });

    // Draw the polyline connecting the points
    if (latlngs.length > 1) {
      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
      map.fitBounds(polyline.getBounds());
    }
  }
}
