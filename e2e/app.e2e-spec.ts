import { Ng4FormsPage } from './app.po';

describe('ng4-forms App', () => {
  let page: Ng4FormsPage;

  beforeEach(() => {
    page = new Ng4FormsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
