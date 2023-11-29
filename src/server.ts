import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const dbConnect = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(5000, () => {
      console.log(
        `University management server is running on port ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
};

dbConnect();
