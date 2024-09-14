import { Component } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  onSubmit($event: Event, form: HTMLFormElement) {
    $event.preventDefault();
    console.log('Form submitted:', form['email'].value);
    console.log('Form submitted:', form['password'].value);
    // this.UserService.login(form['email'].value, form['password'].value).then(
    (response: any) => {
      sessionStorage.setItem('token', response.token);
      console.log(response.User);
      sessionStorage.setItem('User', JSON.stringify(response.User));
      window.location.href = '/';
    };
    // )
  }
  // constructor(private modalService: NgbModal , private UserService: UserService, private router: Router) {

  // }
}
