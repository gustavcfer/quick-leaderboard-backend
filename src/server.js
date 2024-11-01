import { connect } from './database.js'
import express from 'express'
import chalk from 'chalk'

import logger from './logger.js'

// Routes
import scoreRoutes from './routes/score.routes.js'

// Configure environment variables
import 'dotenv/config'

const server = express()
const PORT = process.env.PORT || 5055

// Log
console.log('\n')
logger.log('Initializing server...')

// Connect to MongoDB
await connect()

// Middleware to parse json before data hits the handler
server.use(express.json())

// Configure routes
server.use('/api/v1/scores', scoreRoutes)

// Starts the server to listen on the specified PORT
server.listen(PORT, ready)

/**
 * This function is called after the server is ready
 */
function ready() {
    // Log
    logger.success('Server is running on port: ' + chalk.reset(PORT))
}
