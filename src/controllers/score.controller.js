import { getScoresColl } from '../database.js'
import { getUnixTime } from 'date-fns'

/**
 * Retrieves all scores from the 'scores' collection in the MongoDB database
 * 
 * @query period : number - Amount of days to look back / default: 365 (1 year)
 * @query limit : number - Limit the amount of scores returned (1 ~ x) / default: 500
 * @query invert : string - true: inverts the order / default: sort scores from highest to lowest
 * 
 * @param req 
 * @param res 
 */
async function getAllScores(req, res) {
    const coll = await getScoresColl()

    if (!coll) {
        res.status(500).json({ error: 'Server error!' })
        return
    }

    const { limit, invert, period } = req.query

    // Set the limit using a parameter, defaulting to 500 if none is provided
    const parsedLimit = (() => {
        if (limit) {
            const parsedValue = parseInt(limit)

            if (!isNaN(parsedValue)) {
                return Math.max(1, parsedValue)
            }
        }
        return 500
    })()

    // Define the period in days for filtering scores
    const parsedPeriod = (() => {
        if (period) {
            const parsedValue = parseInt(period)

            if (!isNaN(parsedValue)) {
                return Math.max(1, parsedValue) * 60 * 60 * 24 // Convert to timestamp
            }
        }
        return 31536000 // Default to 1 year in seconds
    })()

    // Fetch the scores from the database
    const scores = await coll
        .find({ timestamp: { $gte: getUnixTime(new Date()) - parsedPeriod } })
        .limit(parsedLimit)
        .sort({ score: invert === 'true' ? 1 : -1 })
        .toArray()

    res.status(200).json(scores)
}


async function newScore(req, res) {

    const coll = await getScoresColl()

    if (!coll) {
        res.status(500).json({ error: 'Server error!' })
        return
    }

    const { nickname, key, score, timestamp } = req.body

    const scoredoc = await coll.findOne({ key: key })

    if (scoredoc) {
        
        // Checks if the new score is higher than the current one
        if( scoredoc.score >= score){
            res.status(200).json({ message: 'Score is lower than the current one. No updates were made' })
            return
        }

        // Build the update object dynamically
        const updateFields = { score }
        if (nickname !== null && nickname !== undefined) {
            updateFields.nickname = nickname
        }
        // If timestamp is null, uses the current timestamp
        updateFields.timestamp = timestamp !== null && timestamp !== undefined ? timestamp : getUnixTime(new Date())

        const doc = await coll.updateOne(
            { key: key },
            { $set: updateFields }
        )

        res.status(200).json({ message: 'Score updated successfully' })
        return
    } else {
        // Create a new document if there's no document with the requested key

        const createFields = {
            nickname : nickname !== null && nickname !== undefined ? nickname : 'Anonymous',
            key,
            score,
            timestamp: timestamp !== null && timestamp !== undefined ? timestamp : getUnixTime(new Date())
        }

        const doc = await coll.insertOne(
            createFields
        )

        res.status(200).json({ message: 'Score successfully created' })
        return
    }
}

export {
    getAllScores,
    newScore
}