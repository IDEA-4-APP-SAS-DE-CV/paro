import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false,
}

export async function connectDB() {
  if (conn.isConnected) return;

  const db = await connect('mongodb+srv://starlafrr:Apples01@paro.cmcfdcg.mongodb.net/parodb?retryWrites=true&w=majority&appName=paro');
  conn.isConnected = db.connections[0].readyState;
}

connection.on('connected', () => {
  console.log('Mongoose connected');
})

connection.on('error', (err) => {
  console.log('Mongoose connection Error', err)
});
