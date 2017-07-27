import { browser, by, element } from 'protractor';

export class FramappPage {
  constructor() {
    browser.waitForAngularEnabled(false);
  }

  navigateToRoot() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.navbar-header h1 a')).getText();
  }
}
