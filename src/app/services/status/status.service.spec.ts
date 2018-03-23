import { TestBed, inject } from '@angular/core/testing';

import { StatusService } from './status.service';
import {} from 'jasmine';

describe('StatusService', () => {

  let service: StatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusService]
    });
    service = TestBed.get(StatusService);
  });

  it('should be injectable', inject([StatusService], (injectableService: StatusService) => {
    expect(injectableService).toBeTruthy();
  }));

});
