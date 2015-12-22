import Server from 'socket.io';

const PORT = 8090;

export default function startServer(store) {
  const io = new Server().attach(PORT);
  console.log(`Server started. Listen on ${PORT}`);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', socket => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
