import { PracticePage } from './app.po';

describe('practice App', function() {
  let page: PracticePage;

  beforeEach(() => {
    page = new PracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
