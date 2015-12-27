
export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    const clientId = store.getState().get('clientId');
    const actionWithId = Object.assign({}, action, { clientId });
    socket.emit('action', actionWithId);
  }
  return next(action);
}
