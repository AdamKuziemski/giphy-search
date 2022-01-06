import { Component, OnDestroy, OnInit } from '@angular/core';

import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnDestroy, OnInit {
  results$!: Observable<string[]>;
  totalResults$!: Observable<number>;
  page = 1;

  destroyed$: Subject<void> = new Subject();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.results$ = this.searchService.results$;
    this.totalResults$ = this.searchService.totalResults$;

    this.searchService.offset$.pipe(
      filter(offset => offset === 0),
      takeUntil(this.destroyed$)
    ).subscribe(() => this.page = 1);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setPage(newPage: number): void {
    this.page = newPage;
    this.searchService.paginate(this.page - 1);
  }

}
