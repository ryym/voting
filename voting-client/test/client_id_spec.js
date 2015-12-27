import { expect } from 'chai';
import getClientId from '../src/client_id';

describe('client_id', () => {
  function makeStorage(data) {
    const _storage = Object.assign({}, data);
    return {
      getItem(key) {
        return _storage[key];
      },
      setItem(key, item) {
        _storage[key] = item;
      }
    }
  }

  context('when id has been created', () => {

    it('get client id from the specified storage', () => {
      const id = '12345';
      const storage = makeStorage({ id });
      const clientId = getClientId(storage, 'id')();
      expect(clientId).to.equal(id);
    });

  });

  context('when called first time', () => {

    it('generates a new unique id for the client', () => {
      const storage = makeStorage();
      const clientId = getClientId(storage)();
      expect(clientId).not.to.be.undefined;
    });

    it('sets a generated id in the storage', () => {
      const storage = makeStorage();
      const clientId = getClientId(storage, 'id')();
      expect(storage.getItem('id')).to.equal(clientId);
    });

  });

});
