import { browser, by, element } from 'protractor';

export class FramappPage {
  navigateTo() {
    return browser.get('/products/Telephones');
  }

  getParagraphText() {
    return element(by.css('.navbar-header h1 a')).getText();
  }
}
