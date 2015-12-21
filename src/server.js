import Server from 'socket.io';

const PORT = 8090;

export default function startServer() {
  const io = new Server().attach(PORT);
  console.log(`Server started. Listen on ${PORT}`);
}
