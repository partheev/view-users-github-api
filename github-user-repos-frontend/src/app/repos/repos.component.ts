import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, TitleStrategy } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GithubUserService } from '../githubUser.service';
import { GithubUser, Repo } from '../models/repo.model';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit, OnDestroy {
  username!: string;
  paramsSubscription!: Subscription;
  getRepoSubscription!: Subscription;

  userDetails!: GithubUser;
  repos: Repo[] = [];

  faArrowLeft = faArrowLeft;

  isFetching = true;
  error: { isError: boolean; errorMessage?: string } = {
    isError: false,
    errorMessage: '',
  };

  paginatedRepos: Repo[] = [...this.repos];
  reposPerPage = 10;
  noOfPages = Math.ceil(this.repos.length / this.reposPerPage);
  currentPage = 1;
  pages = Array.from(new Array(this.noOfPages));
  paginationStartIndex = (this.currentPage - 1) * this.reposPerPage;
  paginationEndIndex = this.paginationStartIndex + this.reposPerPage;

  constructor(
    private githubUser: GithubUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onNextPage() {
    if (this.currentPage === this.noOfPages) return;
    this.currentPage = this.currentPage + 1;
    this.paginateRepos();
  }
  onPrevPage() {
    if (this.currentPage === 1) return;
    this.currentPage = this.currentPage - 1;
    this.paginateRepos();
  }
  onPageSelect(page: number) {
    this.currentPage =
      page <= this.noOfPages && page > 0 ? page : this.currentPage;
    this.paginateRepos();
  }

  paginateRepos() {
    const paginationStartIndex = (this.currentPage - 1) * this.reposPerPage;
    const paginationEndIndex = paginationStartIndex + this.reposPerPage;
    this.paginatedRepos = this.repos.slice(
      paginationStartIndex,
      paginationEndIndex
    );
  }

  onBack() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  ngOnInit() {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      if (this.username.length === 0) {
        this.router.navigate(['/']);
        return;
      }

      this.getRepoSubscription = this.githubUser
        .getRepos(this.username)
        .subscribe(
          (responseData) => {
            this.userDetails = responseData.userDetails;
            this.repos = responseData.repositories;
            this.isFetching = false;
            this.error = {
              isError: false,
            };

            this.noOfPages = Math.ceil(this.repos.length / this.reposPerPage);
            this.paginateRepos();
            this.pages = Array.from(new Array(this.noOfPages)).map(
              (val, index) => index + 1
            );
          },
          (error) => {
            this.isFetching = false;

            this.error = { isError: true, errorMessage: error.error.message };
          }
        );
    });
  }
  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.getRepoSubscription) {
      this.getRepoSubscription.unsubscribe();
    }
  }
}
