export interface IPackage {
  name: string;
  version: string;
  description: string;
  scripts: {
    [key: string]: string;
  };
  keywords?: string[];
  author?: string;
  license: string;
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
}
