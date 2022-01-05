import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  results$: Observable<string[]> = of([]);

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.results$ = this.searchService.search('wtf');
  }

}
