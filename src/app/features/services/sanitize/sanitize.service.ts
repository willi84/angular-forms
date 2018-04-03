// angular
import { Injectable } from '@angular/core';

/**
 * service to clean string from vulnerable characters
 *
 * useful, when you don't be sure how your API handles this
 */
@Injectable()
export class SanitizeService {

  /**
   * constructor
   */
  constructor() { }

  /**
   * public method to delete unsafe character to avoid XSS
   * @param unsafe incoming string to check
   * @returns cleaned string
   */
  sanitize(unsafe: string): string {
    unsafe = unsafe || '';
    return unsafe.replace(/[<>\/]*/ig, '');
  }

}
