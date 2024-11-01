import { getDB } from '../database.js'

/**
 * Retrieves all scores from the 'scores' collection in the MongoDB database
 * 
 * @param req 
 * @param res 
 */
async function getAllScores(req, res) {
    const db = await getDB()

    const scores = await db.collection('scores').find({}).toArray()
    res.status(200).json(scores)
}

export {
    getAllScores
}