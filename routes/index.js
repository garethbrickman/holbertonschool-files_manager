import express from 'express';

const AppController = require('../controllers/AppController.js');
const UsersController = require('../controllers/UsersController.js');

const router = express.Router();

// returns true if Redis is alive and if the DB is alive too
router.get('/status', AppController.getStatus);
// returns the number of users and files in DB
router.get('/stats', AppController.getStats);
// creates a new user
router.post('/users', UsersController.postNew);

export default router;
