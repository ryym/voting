import uuid from 'uuid';

const ID_KEY = 'voting-client-id';

export default (storage, id_key = ID_KEY) => () => {
  let id = storage.getItem(id_key);
  if (id == null) {
    id = uuid.v4();
    storage.setItem(id_key, id);
  }
  return id;
}
