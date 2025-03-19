import { CheckService } from '../domain/use-cases/checks/check-service.usecase'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)



export class Server {
    public static start() {
        console.log('Server started...')
        CronService.createJob('*/5 * * * * *', () => {
            const url = 'http://localhost:3000'
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`success ----> ${url}`),
                (error) => console.log(error)
            ).execute(url)
            //new CheckService().execute('http://localhost:3000/knights')
        })
    }
};
