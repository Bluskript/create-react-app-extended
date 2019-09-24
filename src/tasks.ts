import fse from 'fs-extra';
import Listr from 'listr';
import path from 'path';
import { defaultpackage, pExec } from '.';
import { installDependency, installDevDependency } from './helpers/installhelper';
import { IAnswers } from './types';

export function tasks(answers: IAnswers): Listr {
  return new Listr(
    [
      {
        title: 'Initialize Project',
        task: () => {
          return new Listr([
            {
              title: 'Initialize package.json',
              task: async () => {
                if (answers.electron) {
                  defaultpackage.homepage = './';
                  defaultpackage.scripts.electron = 'electron .';
                  defaultpackage.scripts.build = 'rescripts build';
                  defaultpackage.scripts.test = 'rescripts test';

                  defaultpackage.scripts.postinstall =
                    'electron-builder install-app-deps';

                  defaultpackage.author = {
                    name: 'Default Author',
                    email: 'nobody@example.com',
                    url: 'https://example.com',
                  };

                  defaultpackage.build = {
                    appId: 'com.create-react-app-extended.defaultapp',
                    productName: answers.projectname,
                    copyright: 'No copyright',
                    mac: {
                      category: 'public.app-category.utilities',
                    },
                    files: ['build/**/*', 'node_modules/**/*'],
                    directories: {
                      buildResources: 'assets',
                    },
                  };

                  defaultpackage.scripts.start =
                    'concurrently "rescripts start" "wait-on http://localhost:3000 && electron ."';

                  defaultpackage.scripts['electron-pack'] = 'electron-builder -lw';

                  // TODO : Add Typescript support for electron-starter
                  defaultpackage.main = 'public/electron.js';
                }

                await Promise.all([
                  fse.writeFile('./package.json', JSON.stringify(defaultpackage)),
                  fse.copyFile(
                    path.join(__dirname, 'generator', 'src', 'electron', '.env'),
                    '.env',
                  ),
                  fse.copyFile(
                    path.join(
                      __dirname,
                      'generator',
                      'src',
                      'electron',
                      '.rescriptsrc.js',
                    ),
                    '.rescriptsrc.js',
                  ),
                  fse.copyFile(
                    path.join(
                      __dirname,
                      'generator',
                      'src',
                      'electron',
                      '.webpack.config.js',
                    ),
                    '.webpack.config.js',
                  ),
                ]);
              },
            },
            {
              title: 'Install React',
              task: async () => {
                await installDependency(answers.packagemanager, 'react');
              },
            },
            {
              title: 'Install React-DOM',
              task: async () => {
                await installDependency(answers.packagemanager, 'react-dom');
              },
            },
            {
              title: 'Install React-Scripts',
              task: async () => {
                await installDependency(answers.packagemanager, 'react-scripts');
              },
            },
            {
              title: 'Install Redux',
              enabled: () => answers.redux,
              task: () => {
                return new Listr([
                  {
                    title: 'Install Redux Base',
                    task: async () => {
                      await installDependency(answers.packagemanager, 'redux');
                    },
                  },
                  {
                    title: 'Install React Redux',
                    task: async () => {
                      await installDependency(answers.packagemanager, 'react-redux');
                    },
                  },
                  {
                    title: 'Install Redux Types',
                    enabled: () => answers.typescript,
                    task: async () => {
                      await installDependency(
                        answers.packagemanager,
                        '@types/react-redux',
                      );
                    },
                  },
                ]);
              },
            },
            {
              title: 'Install Electron',
              enabled: () => answers.electron,
              task: () => {
                return new Listr(
                  [
                    {
                      title: 'Install Electron Core',
                      task: async () => {
                        await installDevDependency(answers.packagemanager, 'electron');
                      },
                    },
                    {
                      title: 'Install electron-builder',
                      task: async () => {
                        await installDevDependency(
                          answers.packagemanager,
                          'electron-builder typescript',
                        );
                      },
                    },
                    {
                      title: 'Install Concurrently',
                      task: async () => {
                        await installDevDependency(
                          answers.packagemanager,
                          'concurrently',
                        );
                      },
                    },
                    {
                      title: 'Install @rescripts/cli',
                      task: async () => {
                        await installDevDependency(
                          answers.packagemanager,
                          '@rescripts/cli',
                        );
                      },
                    },
                    {
                      title: 'Install @rescripts/rescript-env',
                      task: async () => {
                        await installDevDependency(
                          answers.packagemanager,
                          '@rescripts/rescript-env',
                        );
                      },
                    },
                    {
                      title: 'Install wait-on',
                      task: async () => {
                        await installDevDependency(answers.packagemanager, 'wait-on');
                      },
                    },
                    {
                      title: 'Install electron-is-dev',
                      task: async () => {
                        await installDevDependency(
                          answers.packagemanager,
                          'electron-is-dev',
                        );
                      },
                    },
                  ],
                  { concurrent: true },
                );
              },
            },
          ]);
        },
      },
      {
        title: 'Initialize Git',
        enabled: () => answers.repo,
        task: async () => {
          await pExec('git init');
        },
      },
      {
        title: 'Add Public Resources',
        task: () => {
          return new Listr([
            {
              title: 'Add Basic Resources',
              task: async () => {
                await fse.copy(path.join(__dirname, 'generator', 'public'), './public');
              },
            },
            {
              title: 'Add Electron Starter',
              enabled: () => answers.electron,
              task: async () => {
                await fse.copyFile(
                  path.join(__dirname, 'generator', 'src', 'electron', 'electron.js'),
                  './public/electron.js',
                );
              },
            },
          ]);
        },
      },
      {
        title: 'Configure Typescript',
        task: async () => {
          await fse.copyFile(
            path.join(__dirname, 'generator', 'typescript', 'tsconfig.json'),
            './tsconfig.json',
          );
        },
      },
      {
        title: 'Generate Source',
        task: () => {
          return new Listr(
            [
              {
                title: 'Add CSS',
                task: async () =>
                  await fse.copy(
                    path.join(__dirname, 'generator', 'src', 'css'),
                    './src/css',
                  ),
              },
              {
                title: 'Add Images',
                task: async () =>
                  await fse.copy(
                    path.join(__dirname, 'generator', 'src', 'img'),
                    './src/img',
                  ),
              },
              {
                title: 'Add Typescript',
                enabled: () => answers.typescript,
                task: async () => {
                  if (answers.redux) {
                    await Promise.all([
                      installDependency(
                        answers.packagemanager,
                        '@types/react @types/react-dom',
                      ),
                      fse.copy(
                        path.join(__dirname, 'generator', 'src', 'typescript', 'Redux'),
                        './src',
                      ),
                    ]);
                  } else {
                    await Promise.all([
                      installDependency(
                        answers.packagemanager,
                        '@types/react @types/react-dom',
                      ),
                      fse.copy(
                        path.join(__dirname, 'generator', 'src', 'typescript', 'Normal'),
                        './src',
                      ),
                    ]);
                  }
                },
              },
              {
                title: 'Add Javascript',
                enabled: () => !answers.typescript,
                task: async () => {
                  if (answers.redux) {
                    await fse.copy(
                      path.join(__dirname, 'generator', 'src', 'javascript', 'Redux'),
                      './src',
                    );
                  } else {
                    await fse.copy(
                      path.join(__dirname, 'generator', 'src', 'javascript', 'Normal'),
                      './src',
                    );
                  }
                },
              },
              {
                title: 'Add Redux',
                enabled: () => answers.redux,
                task: async () => {
                  fse.mkdirSync('./src/store');
                  await fse.copy(
                    path.join(__dirname, 'generator', 'src', 'store', 'typescript'),
                    './src/store',
                  );
                },
              },
            ],
            { concurrent: true },
          );
        },
      },
    ],
    { concurrent: true },
  );
}
