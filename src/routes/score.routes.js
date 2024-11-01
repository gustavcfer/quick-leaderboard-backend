import express from 'express'
import {
    getAllScores
} from '../controllers/score.controller.js'

const router = express.Router()

router.get('/', getAllScores)

export default router