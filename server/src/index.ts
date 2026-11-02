import app from './app';
import { PORT } from './config/env';

app.listen(PORT, () => {
  console.log(`API server ready at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
