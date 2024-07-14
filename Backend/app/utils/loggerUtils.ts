import winston from "winston";
import winstonDailyRotateFile from "winston-daily-rotate-file";
import colors from 'colors';


colors.setTheme({
    info: "green",
    warn: "yellow",
    error: "red",
    debug: "blue"
})

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winstonDailyRotateFile({
            filename: 'logs/application.log',
            datePattern: "yyyy-mm-dd",
            zippedArchive: true,
            maxSize: '20mb',
            maxFiles: '14d'
        })
    ]
});