import { MongoClient } from 'mongodb'
import express from 'express'
import chalk from 'chalk'

import logger from './logger.js'

// Configure environment variables
import 'dotenv/config'

const server = express()
const PORT = process.env.PORT || 5055

// Log
console.log('\n')
logger.log('Initializing server...')

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
})


/**
 * Connect to MongoDB database using MongoDB Native System
 */
async function connect() {
    try {
        logger.start('Connecting to MongoDB...')
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db('leaderboard').command({ ping: 1 })
        // Log
        logger.success('Successfully' + chalk.reset(' connected to ') + chalk.green('MongoDB') + chalk.reset('!'))

    } catch (error) {
        // Log
        logger.error(chalk.red('Failed to connect to MongoDB\n'))
        logger.log(error)
        logger.error('\nApplication process closed!')

        // Stop the app
        process.exit(1)

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

await connect()

// Starts the server to listen on the specified PORT
server.listen(PORT, ready)

/**
 * This function is called after the server is ready
 */
function ready() {
    // Log
    logger.success('Server is ready on port: ' + chalk.reset(PORT))
}
