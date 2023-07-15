import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReposComponent } from './repos/repos.component';
import { LoaderComponent } from './loader/loader.component';
import { UserDetailsComponent } from './repos/user-details/user-details.component';
import { RepoComponent } from './repos/repo/repo.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ReposComponent, LoaderComponent, UserDetailsComponent, RepoComponent, PaginationComponent],
  imports: [
    FontAwesomeModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
