import { IdentityData } from '../db/identity-data.model';

export enum UserRole {
  customer = 'customer',
  handler = 'handler'
};
export interface UserDBModel extends IdentityData {
  name: string;
  password: string;
  token?: string;
  role: UserRole
}