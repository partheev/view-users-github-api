import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GithubUser, Repo } from './models/repo.model';

@Injectable({ providedIn: 'root' })
export class GithubUserService {
  userDetails!: GithubUser;
  constructor(private http: HttpClient) {}

  getUserDetails(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(
      environment.backendURL + '/github/check-username',
      {
        params: new HttpParams().set('username', username),
      }
    );
  }

  getRepos(username: string) {
    return this.http.get<{ repositories: Repo[]; userDetails: GithubUser }>(
      environment.backendURL + '/github/repos',
      {
        params: new HttpParams().set('username', username),
      }
    );
  }
}
