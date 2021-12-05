import { IdentityData } from '../db/identity-data.model';

export interface UserDBModel extends IdentityData {
  name: string;
  password: string;
}