// angular
import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';

// to be tested
import { StatusService } from './status.service';

describe('StatusService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusService]
    });
  });

  it('should be injectable', inject([StatusService], (injectableService: StatusService) => {
    expect(injectableService).toBeTruthy();
  }));

});
