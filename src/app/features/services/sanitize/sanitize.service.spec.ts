// angular
import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';

// to be tested
import { SanitizeService } from './sanitize.service';
describe('SanitizeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanitizeService]
    });
  });

  it('should be injectable', inject([SanitizeService], (injectableService: SanitizeService) => {
    expect(injectableService).toBeTruthy();
  }));

  it('should strip wrong chars', inject([SanitizeService], (injectableService: SanitizeService) => {
    expect(injectableService.sanitize('strato')).toEqual('strato');
    expect(injectableService.sanitize('<script>alert("xss")</script>')).toEqual('scriptalert("xss")script');
  }));
});
