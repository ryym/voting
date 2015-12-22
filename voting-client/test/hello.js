import { expect } from 'chai';

describe('nothing', () => {
  it('has global objects', () => {
    expect(window).not.to.be.undefined;
    expect(document).not.to.be.undefined;
    expect(navigator).not.to.be.undefined;
  });
});
