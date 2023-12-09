import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

const dbConnect = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(5000, () => {
      console.log(
        `University management server is running on port ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  process.exit(1);
});
