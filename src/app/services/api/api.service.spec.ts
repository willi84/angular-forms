import { TestBed,  inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpHandler  } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, HttpClient, HttpHandler]
    });
    service = TestBed.get(ApiService);
    httpClient = TestBed.get(HttpClient);
  });
  it('should be injectable', inject([ApiService], (injectableService: ApiService) => {
    expect(injectableService).toBeTruthy();
  }));

  describe('Function: getApiFeedback', () => {
    it('should exist', () => {
      expect(service.getApiFeedback).toEqual(jasmine.any(Function));
    });

    it('should call httpClient.post with a given list of ids', () => {
      spyOn(httpClient, 'post').and.returnValue(Observable.of('foobar'));
      let data = '';
      service.getApiFeedback('foobar')
        .subscribe(
          (response) => {

            data = response;
            console.log(data);
          }
        );

        expect(data).toEqual('foobar');
    });
  });
});
