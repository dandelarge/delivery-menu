import { Injectable, Inject } from '@nestjs/common';
// import {Low, JSONFile} from 'lowdb';
// import { join } from 'path';

@Injectable()
export class DbLowService {
  // private db: Low;
  // constructor(
  //   @Inject('DbName') private readonly name: string
  // ) {
  //   const file = join(__dirname, `../files/${name}.db.json`);
  //   const adapter = new JSONFile(file);
  //   this.db = new Low(adapter);
  // }

  // async read(): Promise<void> {
  //   return await this.db.read();
  // }

  // async write(): Promise<void> {
  //   return await this.db.write();
  // }

  // add(data: any): any {
  //   const existingData = (this.db.data as Array<any>) || [];
  //   this.db.data = [...existingData, data];
  // }

  // async getData(): Promise<any> {
  //   if(this.db.data)
  //     return this.db.data;
  //   await this.read();
  //   return this.db.data;
  // }
}
