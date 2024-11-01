import chalk from "chalk";

let loadingInterval
let loadingChars = ['|', '/', '-', '\\']
let index = 0

export default class logger{
    static isLoading = false;

    static start(message){
        logger.stop()

        logger.isLoading = true;

        loadingInterval = setInterval(() => {
            process.stdout.write(`\r[${loadingChars[index]}] ${message ? message : ''}`)
            index = (index + 1) % loadingChars.length
        }, 100); // Adjust the speed of the loading effect
    }
    
    static stop(message){
        clearInterval(loadingInterval)
        logger.isLoading = false;
        if(message){
            process.stdout.write(`\r${message}        \n`) // Clear the loading line with a message
        } else process.stdout.write('\r') // Clear the loading line
    }
    
    static log(message){
        process.stdout.write(`\r${message}     \n`) // Log a message
    }

    static error(message){
        if(logger.isLoading){
            logger.stop(chalk.red(`[x] ${message ? message : 'Loading has failed!'}`))
        } else {
            process.stdout.write(`\r${chalk.red(message ? message : 'Error!')}     \n`) // Log error message
        }
    }

    static success(message){
        if(logger.isLoading){
            logger.stop(chalk.green(`[✓] ${message ? message : 'Loading completed successfully!'}`))
        } else{
            process.stdout.write(`\r${chalk.green(message ? message : 'Success!')}     \n`)
        }
    }
}