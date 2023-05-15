import  express  from "express";
import {generateRequestId,checkRequestId} from '../controllers/requestController.js';

const router = express.Router();
// router.post('/',createRequest);
router.post('/check-request-id', checkRequestId);
router.post('/generate-request-id', generateRequestId);

export default router;