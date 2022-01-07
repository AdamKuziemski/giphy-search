import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchService } from '../search.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: SearchService, useValue: { search: jasmine.createSpy() } }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        searchService = TestBed.inject(SearchService);
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger search after the control value changes', fakeAsync(() => {
    component.query.setValue('hello world');
    tick(1001);
    expect(searchService.search).toHaveBeenCalledWith('hello+world');
  }));
});
