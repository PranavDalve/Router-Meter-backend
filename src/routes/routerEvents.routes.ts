import { Router } from 'express';
import { RDSDataSource } from '../config/rdsDataSource';
import { RouterEvent } from '../entities/RouterEvent';

const router = Router();

router.get('/router-event', async (req, res) => {
  try {
    const repo = RDSDataSource.getRepository(RouterEvent); // ✅ must use RDSDataSource
    const events = await repo.find({ order: { timestamp: 'DESC' } });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch router events' });
  }
});

export default router;
