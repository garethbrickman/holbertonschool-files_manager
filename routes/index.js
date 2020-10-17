import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';

const router = express.Router();

// returns true if Redis is alive and if the DB is alive too
router.get('/status', getStatus);
// returns the number of users and files in DB
router.get('/stats', getStats);

export default router;
