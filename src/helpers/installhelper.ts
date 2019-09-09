import { pExec } from '..';
import { managertype } from '../types';

export default async function installDependency(packagemanager: managertype, target: string): Promise<any> {
  switch (packagemanager) {
    case 'npm':
      return await pExec(`npm i ${target}`);
    case 'yarn':
      return await pExec(`yarn add ${target}`);
    case 'pnpm':
      return await pExec(`pnpm i ${target}`);
    default:
  }
}
