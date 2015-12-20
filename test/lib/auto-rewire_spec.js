import assert from 'assert';

import rewire from '../../lib/auto-rewire';
import greeter from './_greeter';
import time from './_time';

describe('auto rewire', () => {

  it('does not inject mocks unless run() is called', () => {
    assert.equal(greeter.greet(), 'Hello');
    rewire(greeter, {
      greet: () => 'Good evening'
    });
    assert.equal(greeter.greet(), 'Hello');
  });

  it('injects mocks while running the action', () => {
    assert.equal(greeter.greet(), 'Hello');
    rewire(greeter, {
      greet: () => 'Good evening'
    })
    .run(() => {
      assert.equal(greeter.greet(), 'Good evening');
    });
  });

  it('resets injected mocks after the action', () => {
    rewire(greeter, {
      greet: () => 'Good evening'
    })
    .run(() => {});
    assert.equal(greeter.greet(), 'Hello');
  });

  context('with async function', () => {

    it('injects mocks when running the action', done => {
      assert.equal(greeter.greet(), 'Hello');
      rewire(greeter, {
        greet: () => 'Good evening'
      })
      .run(_done => {
        setTimeout(() => {
          assert.equal(greeter.greet(), 'Good evening');
          _done();
          done();
        }, 5);
      });
    });

    it('resets injected mocks after the action', done => {
      assert.equal(greeter.greet(), 'Hello');
      rewire(greeter, {
        greet: () => 'Good evening'
      })
      .run(_done => {
        setTimeout(() => {
          _done();
          assert.equal(greeter.greet(), 'Hello');
          done();
        }, 5);
      });
    });

  });

  describe('use()', () => {

    it('rewires multiple dependencies', () => {
      rewire()
        .use(greeter, {
          greet: () => 'Good evening'
        })
        .use(time, {
          now: () => 'I dont know'
        })
        .run(() => {
          assert.deepEqual({
            'greeter.greet()': greeter.greet(),
            'time.now()': time.now()
          }, {
            'greeter.greet()': 'Good evening',
            'time.now()': 'I dont know'
          });
        });
    });

  });

});
