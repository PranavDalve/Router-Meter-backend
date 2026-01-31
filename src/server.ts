import app from './app.js';
import { AppDataSource } from './config/database.js';
import { RDSDataSource } from './config/rdsDataSource.js';

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}
async function bootstrap() {
  try {
    await RDSDataSource.initialize();
    console.log('→ Data Source has been initialized! (Connected to RDS)');

    // Your express/nest app initialization here...
    // app.listen(...)
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  }
}

bootstrap();

start();