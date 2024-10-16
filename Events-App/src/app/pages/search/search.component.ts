import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service'; // Adjust the path as needed
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = []; // Array to hold search results
  isLoading: boolean = false; // Optional: loading state
  selectedDate: string = ''; // For date filtering
  selectedCategory: number | undefined = undefined; // For category filtering
  categories: { id: number; name: string }[] = []; // Categories will be populated from an API

  constructor(private route: ActivatedRoute, private searchService: SearchService) {}

  ngOnInit() {
    // Fetch categories from an API
    this.fetchCategories();

    // Retrieve the search query from the route parameters
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || ''; // Retrieve the search query
      if (this.searchQuery) {
        this.performSearch(this.searchQuery); // Call a method to perform the search
      }
    });
  }

  // Method to fetch categories
  fetchCategories() {
    this.searchService.fetchCategories().subscribe({
      next: (categories) => {
        this.categories = categories; // Store fetched categories
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  // Perform search with query and filters
  performSearch(query: string) {
    this.isLoading = true; // Set loading state
    this.searchService.search(query, { date: this.selectedDate, category: this.selectedCategory })
      .subscribe({
        next: (results) => {
          this.searchResults = results; // Store search results
          console.log('Search results:', this.searchResults);
          this.isLoading = false; // Reset loading state
        },
        error: (error) => {
          console.error('Search error:', error);
          this.isLoading = false; // Reset loading state
        },
      });
  }

  // Toggle event attendance
  attendEvent(eventId: number): void {
    this.searchService.attendEvent(eventId).subscribe({
      next: (response) => {
        // Update the attended status of the event in the search results
        const event = this.searchResults.find(result => result.id === eventId);
        if (event) {
          event.attended = !event.attended; // Toggle the attended status
        }
        console.log(response.message);
      },
      error: (err) => {
        console.error('Error attending event:', err);
      },
    });
  }
}
