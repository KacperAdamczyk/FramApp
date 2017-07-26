import { FramappPage } from './app.po';
import { browser } from 'protractor';

describe('framapp App', () => {
  let page: FramappPage;

  beforeEach(() => {
    page = new FramappPage();
  });

  it('should display welcome message', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('FramApp');
  });
});
