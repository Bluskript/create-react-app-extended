import { pExec } from '..';
import { managertype } from '../types';

/**
 * Installs Dependency
 * @param packagemanager The package manager to use for installation
 * @param target The target package to install
 * @returns Promise when the dep is installed
 */
export async function installDependency(packagemanager: managertype, target: string): Promise<any> {
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

/**
 * Installs Dev Dependency
 * @param packagemanager The package manager to use for installation
 * @param target The target package to install
 * @returns Promise when the dev dep is installed
 */
export async function installDevDependency(packagemanager: managertype, target: string): Promise<any> {
  switch (packagemanager) {
    case 'npm':
      return await pExec(`npm i --save-dev ${target}`);
    case 'yarn':
      return await pExec(`yarn add --save-dev ${target}`);
    case 'pnpm':
      return await pExec(`pnpm i --save-dev ${target}`);
    default:
  }
}
