import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchService } from './search.service';


@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
  ],
  exports: [
    SearchComponent,
    SearchResultsComponent
  ],
  providers: [
    SearchService
  ]
})
export class GiphyModule { }
