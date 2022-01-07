import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { combineLatest, map, Observable, shareReplay, Subject, switchMap } from 'rxjs';

import type { Gif } from './model/gif';
import type { SearchResponse } from './model/search-response';

const API_KEY = 'zGJIF4jNJPd5kJLcrVg67N3Dtui9A6Zh';
const RESULTS_PER_PAGE = 9;
const SEARCH_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${RESULTS_PER_PAGE}`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  results$!: Observable<Gif[]>;
  totalResults$!: Observable<number>;

  query$: Subject<string> = new Subject();
  offset$: Subject<number> = new Subject();

  private search$!: Observable<SearchResponse>;

  constructor(private http: HttpClient) {
    this.search$ = combineLatest([
      this.query$,
      this.offset$
    ]).pipe(
      switchMap(([query, offset]) => this.http.get<SearchResponse>(`${SEARCH_API_URL}&q=${query}&offset=${offset}`)),
    );

    this.totalResults$ = this.search$.pipe(
      map(searchResult => searchResult.pagination.total_count),
      shareReplay(1)
    );

    this.results$ = this.search$.pipe(
      map(searchResult => searchResult.data),
      shareReplay(1)
    );
  }

  search(query: string): void {
    this.query$.next(query);
    this.offset$.next(0);
  }

  paginate(page: number): void {
    this.offset$.next(page * RESULTS_PER_PAGE);
  }
}
