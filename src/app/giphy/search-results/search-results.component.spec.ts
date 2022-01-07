import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import type { Gif } from '../model/gif';
import { SearchService } from '../search.service';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let service: SearchService;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      providers: [
        { provide: SearchService, useValue: SEARCH_SERVICE_MOCK },
        { provide: NgbModal, useValue: { open: () => ({}) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.inject(SearchService);
        modalService = TestBed.inject(NgbModal);
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch pages in the search service', () => {
    component.setPage(2);
    expect(service.paginate).toHaveBeenCalledWith(1);
  });

  it('should open modals after clicking on an image', () => {
    spyOn(modalService, 'open').and.returnValue({ componentInstance: {} } as NgbModalRef);

    component.showModal(null as unknown as Gif);
    expect(modalService.open).toHaveBeenCalled();
  });
});

const SEARCH_SERVICE_MOCK = {
  results$: of([]),
  totalResults$: of(666),
  offset$: of(0),
  paginate: jasmine.createSpy(),
};
