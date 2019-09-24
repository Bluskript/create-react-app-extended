export type managertype = 'npm' | 'yarn' | 'pnpm';

export interface IAnswers {
  projectname: string;
  repo: boolean;
  packagemanager: managertype;
  typescript: boolean;
  redux: boolean;
  electron: boolean;
  hotloader: boolean;
}

export interface ITemplate {
  imports: {
    [key: string]: { package: string; destructure: boolean };
  };
  typescript: boolean;
  name: string;
  code: string;
  functional: boolean;
  hocs: string[];
}
