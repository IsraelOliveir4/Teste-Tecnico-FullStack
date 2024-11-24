import { Router } from 'express';
import { confirmRide, estimateRide, listRides } from '../controllers/controller';

const router = Router();

router.post('/ride/estimate', estimateRide);
router.patch('/ride/confirm', confirmRide);
router.get('/ride/:customer_id', listRides);

export default router;
