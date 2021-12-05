import { Injectable, Inject } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DbService {

  db: JsonDB;
  constructor(@Inject('db-filename') filename: string) {
    this.db = new JsonDB(new Config(filename, true, true, '/'));
    try {
      this.db.getObject(`/${filename}`);
    } catch ( error ) {
      this.db.push(`/${filename}`, []);
    }
  }

  set(path: string, data: any) {
    return this.db.push(path, data);
  }

  getAll<T>(path: string = ''): T[] {
    return this.db.getObject<T[]>(`/${path}`);
  }

  get<T>(path: string, searchValue: string, key: string): T {
    const index = this.db.getIndex(`/${path}`, searchValue, key);
    return this.db.getObject<T>(`/${path}[${index}]`);
  }

  add(path: string, data: any): void {
    const id = uuid();
    const createdAt = new Date().toString();
    const creationInfo = {
      'created-at': createdAt,
      'last-updated': createdAt,
      id
    };
    const dataWithId = {...data, ...creationInfo};
    try {
      return this.db.push(`/${path}[]`, dataWithId, true);
    } catch (e) {
      return this.db.push(`/${path}[0]`, dataWithId, true);
    }
  }

  update(path: string, data: any, searchValue: string, key: string) {
    const index = this.db.getIndex(`/${path}`, searchValue, key);
    const existingData = this.db.getData(`/${path}[${index}]`);
    const lastUpdated = new Date().toString();
    const result = {...existingData, ...data, 'last-updated': lastUpdated };
    this.db.push(`/${path}[${index}]`, result, true);
    return this.db.getObject(`/${path}[${index}]`);
  }

  delete(path: string, searchValue: string, key: string) {
    const index = this.db.getIndex(path, searchValue, key);
    this.db.delete(`/${path}[${index}]`);
  }

}
