import { Component, Input, OnInit } from '@angular/core';
import { GithubUser } from 'src/app/models/repo.model';
import {
  faLocationDot,
  faPaperclip,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  @Input() user!: GithubUser;
  @Input() username!: string;

  faLocationDot = faLocationDot;
  faPaperclip = faPaperclip;
  faUser = faUser;
}
