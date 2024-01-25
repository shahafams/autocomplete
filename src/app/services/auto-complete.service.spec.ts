import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AutoCompleteService } from './auto-complete.service';

describe('AutoCompleteService', () => {
  let autoCompleteService: AutoCompleteService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutoCompleteService],
    });
    
    autoCompleteService = TestBed.inject(AutoCompleteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(autoCompleteService).toBeTruthy();
  });

  it('should send a post request and return data', () => {
    const response: string[] = ['City1', 'City2'];

    autoCompleteService.getAutocomplete('Cit').subscribe((data) => {
      expect(data).toEqual(response);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/autocomplete');
    expect(req.request.method).toEqual('POST');

    req.flush(response);
  });
});
