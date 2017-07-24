import express from 'express';
let router = express.Router();

import facebook from './facebook';
import ticketmaster from './ticketmaster';

router.use('/facebook', facebook);
router.use('/ticketmaster', ticketmaster);

export default router;