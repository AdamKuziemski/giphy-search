import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil } from 'rxjs';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy, OnInit {
  query: FormControl = new FormControl('');

  destroyed$: Subject<void> = new Subject();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.query.valueChanges.pipe(
      filter(value => value.trim().length > 0),
      debounceTime(1000),
      map(value => value.trim().replace(/\s+/g, '+')),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe(value => {
      this.searchService.search(value);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
