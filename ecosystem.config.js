import { join } from 'path';

export const apps = [{
  name: 'frontend',
  script: 'npm',
  args: 'start',
  cwd: join(__dirname, 'frontend'),
  env_dev: {
    PORT: '3008'
  }
},
{
  name: 'backend',
  script: 'npm',
  args: 'run start:dev',
  cwd: join(__dirname, 'backend')
}];