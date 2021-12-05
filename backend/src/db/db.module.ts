import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({})
export class DbModule {
  static forRoot(dbFilename: string) {
    return {
      module: DbModule,
      providers: [{provide: 'db-filename', useValue: dbFilename}, DbService],
      exports: [DbService]
    }
  }
}
