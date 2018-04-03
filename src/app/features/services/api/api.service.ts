
// angular
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// configuration
import { environment } from '@environment/environment.prod';

/**
 * Service to request an api
 */
@Injectable()
export class ApiService {

    /**
     * constructor
     * @param http instance of http client
     */

    constructor(private http: HttpClient) {
    }

    /**
     * returns observable object from api call with httclient
     * @returns Ein Observable
     */
    getApiFeedback(body: any): Observable<any> {
        return this.http.
            post(environment.API, body,  {
                headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                // responseType: 'text'
            });
    }
}
