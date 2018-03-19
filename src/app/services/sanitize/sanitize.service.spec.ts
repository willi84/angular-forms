import { TestBed, inject } from '@angular/core/testing';

import { SanitizeService } from './sanitize.service';
import {} from 'jasmine';

describe('SanitizeService', () => {

  let service: SanitizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanitizeService]
    });
    service = TestBed.get(SanitizeService);
  });

  it('should be injectable', inject([SanitizeService], (injectableService: SanitizeService) => {
    expect(injectableService).toBeTruthy();
  }));

  it('should strip wrong chars', inject([SanitizeService], (injectableService: SanitizeService) => {
    expect(injectableService.sanitize('strato')).toEqual('strato');
    expect(injectableService.sanitize('<script>alert("xss")</script>')).toEqual('scriptalert("xss")script');
  }));
});
