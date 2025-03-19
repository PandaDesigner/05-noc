import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasource';



export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDatasource: LogDatasource,
    ) { }

    async seveLog(log: LogEntity): Promise<void> {
        this.logDatasource.seveLog(log)
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
        return this.logDatasource.getLog(severityLevel)
    }

}