import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-form-contact h1')).getText();
  }
}
