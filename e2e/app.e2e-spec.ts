import { FramappPage } from './app.po';

describe('framapp App', () => {
  let page: FramappPage;

  beforeEach(() => {
    page = new FramappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
