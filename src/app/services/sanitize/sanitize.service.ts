import { Injectable } from '@angular/core';

/**
 * Service zur Bereinigung von Strings.
 */
@Injectable()
export class SanitizeService {

  /**
   * Konstruktor für Sanitizer.
   */
  constructor() { }

  /**
   * Öffentliche Methode um problematische Zeichen zu entfernen zur Vermeidung von XSS.
   * @param unsafe zu bereinigender String
   * @returns bereinigter String
   */
  sanitize(unsafe: string): string {
    unsafe = unsafe || '';
    return unsafe.replace(/[<>\/]*/ig, '');
  }

}
