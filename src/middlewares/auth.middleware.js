import crypto from 'crypto'

// Configures environment variabels
import 'dotenv/config'


/**
 * Basic authorization security with apikey / hash
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns *void* if unauthorized
 */
export function auth(req, res, next) {

    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ error: 'No token' })
        return
    }

    const hash = 'Bearer ' + crypto
        .createHmac('sha256', process.env.API_SECRET)
        .digest('hex')

    if (token !== hash) {
        res.status(401).json({ error: 'Invalid token' })
        return
    }

    next()
}


/**
 * Authorization security with *score key*
 * 
 * @param req body { nickname, key, score, timestamp } 
 * @param res 
 * @param next 
 * @returns *void* if unauthorized
 */
export function putAuth(req, res, next) {

    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ error: 'No token' })
        return
    }

    const { key, score } = req.body

    if (!key || !score) {
        res.status(400).json({ error: 'Body should have KEY and SCORE to be a valid request' })
        return
    }

    const hash = 'Bearer ' + crypto
        .createHmac('sha256', process.env.API_SECRET)
        .update(key)
        .digest('hex')


    if (token !== hash) {
        res.status(401).json({ error: 'Invalid token' })
        return
    }

    next()
}