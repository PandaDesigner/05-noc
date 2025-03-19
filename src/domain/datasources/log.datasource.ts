import { LogEntity, LogSeverityLevel } from '../entities/log.entity';


export abstract class LogDatasource {
    abstract seveLog(log: LogEntity): Promise<void>;
    abstract getLog(saverityLevel: LogSeverityLevel): Promise<Array<LogEntity>>
}

