import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css'],
  standalone: true,
  imports: [CommonModule] // Add CommonModule to imports

})
export class LoadingOverlayComponent {
  @Input() loading: boolean = false; // Flag to control visibility of the overlay
}
