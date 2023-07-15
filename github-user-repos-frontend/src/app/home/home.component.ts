import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GithubUserService } from '../githubUser.service';
// import githubBanner from '../../assets/github-banner.png';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  isFetching = false;
  isValid = false;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  getUserSubscription!: Subscription;
  constructor(private githubUser: GithubUserService, private router: Router) {}

  onChangeUsername(username: string) {
    if (username.length === 0) {
      this.username = username;
      this.isFetching = false;
      this.isValid = false;
    } else {
      this.username = username;
      this.isFetching = true;
      if (this.getUserSubscription) {
        this.getUserSubscription.unsubscribe();
      }
      this.getUserSubscription = this.githubUser
        .getUserDetails(username)
        .subscribe(
          (responseData) => {
            this.isFetching = false;
            this.isValid = true;
          },
          (error) => {
            console.log(error.error.message);
            this.isFetching = false;
            this.isValid = false;
          }
        );
    }
  }

  onSubmit() {
    this.router.navigate(['/repos'], {
      queryParams: {
        username: this.username,
      },
    });
  }
}
