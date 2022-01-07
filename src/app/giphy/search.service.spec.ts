import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs';

import { SearchService, SEARCH_API_URL } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request gifs after search is called', () => {
    service.results$.subscribe((res) => expect(res).toEqual([]));
    service.totalResults$.subscribe((total) => expect(total).toEqual(666));

    service.search('hello+world');

    httpMock.expectOne(`${SEARCH_API_URL}&q=hello+world&offset=0`).flush({ data: [], pagination: { total_count: 666 } });
    httpMock.verify();
  });

  it('should request more gifs after search is called', () => {
    // first request
    service.results$.pipe(take(1)).subscribe((res) => expect(res.length).toEqual(0));
    // second request
    service.results$.pipe(skip(1)).subscribe((res) => expect(res.length).toEqual(1));

    // first request
    service.search('hello+world');

    httpMock.expectOne(`${SEARCH_API_URL}&q=hello+world&offset=0`).flush({ data: [], pagination: { total_count: 666 } });
    httpMock.verify();

    // second request
    service.paginate(1);

    httpMock.expectOne(`${SEARCH_API_URL}&q=hello+world&offset=9`).flush({ data: [null], pagination: { total_count: 666 } });
    httpMock.verify();
  });
});
