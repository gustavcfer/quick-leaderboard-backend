import { MongoClient } from 'mongodb'
import chalk from 'chalk'
import logger from './logger.js'
import 'dotenv/config'

// Instantiate MongoDB Cliente
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
})

let dbInstance

/**
 * Connect to MongoDB database using MongoDB Native System
 */
export async function connect() {
    // Connect
    try {
        logger.start('Connecting to MongoDB...')

        const name = process.env.DB_NAME
        if (!name) {
            throw new Error('DB_NAME not set. Database must have a name, like "leaderboard".')
        }

        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        dbInstance = client.db(name)
        await dbInstance.command({ ping: 1 })
        // Log
        logger.success('Successfully' + chalk.reset(' connected to ') + chalk.green('MongoDB') + chalk.reset('!'))

    } catch (error) {
        // Log
        logger.error('Failed to connect to MongoDB\n')
        logger.log(error)
        logger.error('\nApplication process closed!')

        // Stop the app
        process.exit(1)

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

export async function getDB(){
    return dbInstance
}

export async function getScoresColl(){
    return dbInstance.collection('scores')
}