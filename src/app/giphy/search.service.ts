import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import type { Gif } from './model/gif';
import type { SearchResponse } from './model/search-response';

const API_KEY = 'zGJIF4jNJPd5kJLcrVg67N3Dtui9A6Zh';
const SEARCH_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  search(query: string, offset = 0): Observable<string[]> {
    return this.http.get<SearchResponse>(`${SEARCH_API_URL}&q=${query}&offset=${offset}&limit=9`).pipe(
      map((response: SearchResponse) => response.data.map((gif: Gif) => gif.images.fixed_height.url))
    );
  }

}
