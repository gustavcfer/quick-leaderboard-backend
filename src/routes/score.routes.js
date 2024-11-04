import express from 'express'

// Controllers
import {
    getAllScores,
    newScore
} from '../controllers/score.controller.js'

// Middlewares
import { auth, putAuth } from '../middlewares/auth.middleware.js'

const router = express.Router()

// GET
router.get('/', auth, getAllScores)

// PUT
router.put('/', putAuth, newScore)

export default router