import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogRepository {
    abstract seveLog(log: LogEntity): Promise<void>;
    abstract getLog(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>>
}

