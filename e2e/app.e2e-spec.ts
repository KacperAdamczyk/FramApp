import { FramappPage } from './app.po';
import { browser, by, element } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';

describe('framapp App', () => {
  let page: FramappPage;

  beforeEach(() => {
    page = new FramappPage();
  });

  it('should display welcome message', () => {
    page.navigateToRoot();
    expect(page.getParagraphText()).toEqual('FramApp');
  });

   it('should log in', () => {
     element(by.css('.pSignButton')).click();
     expect(element(by.css('.pMenuAdmin'))).toBeTruthy();
   });

  xit('should click on all categories', () => {
    const buttons = element.all(by.css('li a'));
  });

  it('should add category', () => {
    element.all(by.css('.pMenuAdmin li a')).last().click();
    element(by.css('.pAddButton')).click(); // Add
    const categoryTitle = `Category #${Math.floor(Math.random() * Math.pow(10, Math.ceil(Math.random() * 6)))}`;
    element(by.id('title')).sendKeys(categoryTitle);
    element(by.id('description')).sendKeys('Lorem ipsum dolor sit amet');
    browser.sleep(1000);
    element(by.css('.pSubmitButton')).click(); // Add
    console.log('here');
    const list = element.all(by.css('tr td:nth-child(2)'));
    console.log(list);
    let found = false;
    list.each(l => {
      if (l.innerText === categoryTitle) { found = true; }
    });
    expect(found).toBeTruthy();
  });
});
