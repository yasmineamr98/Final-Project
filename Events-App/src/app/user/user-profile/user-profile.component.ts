import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service'; // Ensure the correct path

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService // Inject the UsersService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.fetchUserProfile(this.userId);
    }
  }

  fetchUserProfile(id: string) {
    this.usersService.getUserById(id).subscribe((data) => {
      this.user = data;
    });
  }
}
