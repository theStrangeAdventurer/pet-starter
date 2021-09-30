import mongoose from 'mongoose';
const RETRY_TIMEOUT = 3000;

export const dbConnect = ({ db }: { db: string }) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`🔛 Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error('🛑 Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', () => {
    console.log('🛑 Disconnect...');
    setTimeout(() => {
      console.log('↩️ Try reconnect to db...');
      connect();
    }, RETRY_TIMEOUT);
  });
};
