
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

/**
 * Service zur Abfrage eines RSS-Feeds.
 */
@Injectable()
export class ApiService {

    /**
     * Konstruktur erzeugt neuen HttpClient
     * @param http Ein Http-client-objekt
     */

    constructor(private http: HttpClient) {
    }

    /**
     * Diese Funktion ruft den Feed ab und gibt einen Observable zurück.
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
