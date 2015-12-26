import { expect } from 'chai';

describe('Global objects required React tests', () => {
  [
    'window',
    'document',
    'navigator'
  ]
  .forEach(object => {
    it(`has ${object} in global`, () => {
      expect(global[object]).not.to.be.undefined;
    });
  });

});
