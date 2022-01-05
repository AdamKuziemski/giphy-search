import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

const API_KEY = 'zGJIF4jNJPd5kJLcrVg67N3Dtui9A6Zh';
const SEARCH_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  search(query: string, offset = 0): Observable<string[]> {
    return this.http.get<any>(`${SEARCH_API_URL}&q=${query}&offset=${offset}&limit=9`).pipe(
      map((response: any) => response.data.map((gif: any) => gif.images.original.url))
    );
  }

}
