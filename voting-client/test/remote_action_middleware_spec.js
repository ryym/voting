import { Map } from 'immutable';
import { expect } from 'chai';
import remoteActionMiddleware from '../src/remote_action_middleware';

describe('remoteActionMiddleware', () => {
  const defaultArgs = {
    socket: { emit() {} },
    store: { getState: () => Map() },
    next() {},
    action: { type: '' }
  }

  function apply(args) {
    const {
      socket, store, next, action
    } = Object.assign({}, defaultArgs, args);
    return remoteActionMiddleware(socket)(store)(next)(action);
  }

  it('calls next function', () => {
    let called = false;
    const next = () => called = true;
    apply({ next });
    expect(called).to.be.true;
  });

  context('with action marked for remote', () => {

    it('emits an action to the server via socket.io', () => {
      let emitted = undefined;

      const socket = { emit: (...args) => emitted = args }
      const next   = () => {};
      const action = { type: 'FOO', meta: { remote: true } }

      apply({ socket, next, action });
      expect(emitted[1].type).to.equal('FOO');
    });

    it('sends client id as a parameter of action', () => {
      let emitted;

      const clientId = 'client-123';
      const socket = {
        emit(...args) { emitted = args }
      }
      const store = {
        getState() { return Map({ clientId }) }
      }
      const action = { type: 'FOO', meta: { remote: true } }

      apply({ socket, store, action });
      expect(emitted[1].clientId).to.equal(clientId);
    });

  });

  context('with normal action', () => {

    it('does not emits an action to the server', () => {
      let emitted = undefined;

      const socket = { emit: (...args) => emitted = args }
      const next   = () => {};
      const action = { type: 'FOO' }

      apply({ socket, next, action });
      expect(emitted).to.be.undefined;
    });

  });
});
