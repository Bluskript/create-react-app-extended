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
    [key: string]: { destructure: boolean };
  };
  name: string;
  code: string;
  functional: boolean;
  hocs: string[];
}
