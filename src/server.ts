import app from './app';
import config from './app/config';

app.listen(5000, () => {
  console.log(`University management server is running on port ${config.port}`);
});
