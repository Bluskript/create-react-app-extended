interface IAuthor {
  name: string;
  email: string;
  url: string;
}

interface IBuild {
  appId: string;
  productName: string;
  copyright: string;
  mac: {
    category: string;
  };
  files: string[];
  directories: {
    buildResources: string;
  };
}

export interface IPackage {
  name: string;
  version: string;
  description: string;
  homepage?: string;
  main?: string;
  private?: boolean;
  scripts: {
    [key: string]: string;
  };
  build?: IBuild;
  keywords?: string[];
  author?: string | IAuthor;
  license: string;
  dependencies: {
    [key: string]: string;
  };
  browserslist?: {
    [key: string]: string[];
  };
  devDependencies: {
    [key: string]: string;
  };
}
