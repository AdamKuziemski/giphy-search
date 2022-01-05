import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
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
