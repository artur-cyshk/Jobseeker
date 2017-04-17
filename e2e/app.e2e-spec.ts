import { JobseekerPage } from './app.po';

describe('jobseeker App', () => {
  let page: JobseekerPage;

  beforeEach(() => {
    page = new JobseekerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
