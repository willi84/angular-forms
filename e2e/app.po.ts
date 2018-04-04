import { browser, by, element } from 'protractor';

/**
 * sample e2e test
 */
export class AppPage {

  /**
   * function to navigate to speciefied url
  */
  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.get('/');
  }

  /**
   * function to get a specified paragraph
  */
  getParagraphText() {
    return element(by.css('app-form-contact h1')).getText();
  }
}
