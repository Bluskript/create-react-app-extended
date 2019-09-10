export type managertype = 'npm' | 'yarn' | 'pnpm';

export interface IAnswers {
  projectname: string;
  repo: boolean;
  packagemanager: managertype;
  typescript: boolean;
  redux: boolean;
}
