import logger from '../logger.js'
import crypto from 'crypto'

// Configures environment variabels
import 'dotenv/config'


/**
 * Basic authorization security with API KEY
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns *void* if unauthorized
 */
export function auth(req, res, next) {
    const apiKey = 'Bearer ' + process.env.API_SECRET

    const token = req.headers.authorization

    if(!token){
        logger.error('Request with no TOKEN in the HEADER was rejected')
        res.status(401).json({error: 'No token'})
        return
    }

    if(token !== apiKey){
        logger.error('Request with INVALID TOKEN was rejected')
        res.status(401).json({error: 'Invalid token'})
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

    if(!token){
        logger.error('Request with no TOKEN in the HEADER was rejected')
        res.status(401).json({error: 'No token'})
        return
    }

    const {nickname, key, score, timestamp } = req.body

    if(!key || !score){
        logger.error('Request body without KEY or SCORE was rejected')
        res.status(400).json({error: 'Body should have KEY and SCORE to be a valid request'})
        return
    }

    const hash = 'Bearer ' + crypto
        .createHmac('sha256', process.env.API_SECRET)
        .update(key)
        .digest('hex')

    if(token !== hash){
        logger.error('Request with INVALID TOKEN was rejected')
        res.status(401).json({error: 'Invalid token'})
        return
    }

    next()
}