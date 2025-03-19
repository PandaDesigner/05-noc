import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs'



export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '')
        });

    }

    async seveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson);
        if (newLog.level === LogSeverityLevel.low) return;
        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }
    }

    private getLogsFromFile = (path: string): Array<LogEntity> => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(LogEntity.fromJson)
        return logs

    }

    async getLog(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {

        const LOG_PATHS = new Map([
            [LogSeverityLevel.low, this.allLogsPath],
            [LogSeverityLevel.medium, this.mediumLogsPath],
            [LogSeverityLevel.high, this.highLogsPath]
        ]);
        const logPath = LOG_PATHS.get(severityLevel);
        if (logPath) {
            return this.getLogsFromFile(logPath);
        }
        throw new Error(`Log path for severity level ${severityLevel} not found`);

        /*  switch (severityLevel) {
             case LogSeverityLevel.low:
                 return this.getLogsFromFile(this.allLogsPath);
             case LogSeverityLevel.medium:
                 return this.getLogsFromFile(this.mediumLogsPath);
             case LogSeverityLevel.high:
                 return this.getLogsFromFile(this.highLogsPath);
             default:
                 throw new Error(`${LogSeverityLevel} not implemented`)
         } */

    }

}

