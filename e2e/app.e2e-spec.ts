import { AppPage } from './app.po';

describe('angular-forms App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display headline', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Forms sample');
  });
});
