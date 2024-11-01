import { getScoresColl } from '../database.js'

/**
 * Retrieves all scores from the 'scores' collection in the MongoDB database
 * 
 * @param req 
 * @param res 
 */
async function getAllScores(req, res) {
    const coll = await getScoresColl()

    const { limit, invert } = req.query

    // Set the limit using a parameter, defaulting to 500 if none is provided
    const parsedLimit = (()=>{
        if(limit){
            const parsedValue = parseInt(limit)

            if (!isNaN(parsedValue)) {
                return Math.max(1, parsedValue)
            }
        }
        return 500
    })()

    const scores = await coll.find({}).limit(parsedLimit).sort({ score: invert === 'true' ? 1 : -1 }).toArray()
    res.status(200).json(scores)
}

export {
    getAllScores
}