import fse from 'fs-extra';
import Listr from 'listr';
import path from 'path';
import { defaultpackage, pExec } from '.';
import { installDependency } from './helpers/installhelper';
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
                await fse.writeFile('./package.json', JSON.stringify(defaultpackage));
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
                    title: "Install Redux Base",
                    task: async () => {
                      await installDependency(answers.packagemanager, 'redux')
                    }
                  },
                  {
                    title: "Install React Redux",
                    task: async () => {
                      await installDependency(answers.packagemanager, 'react-redux');
                    }
                  },
                  {
                    title: "Install Redux Types",
                    enabled: () => answers.typescript,
                    task: async () => {
                      await installDependency(answers.packagemanager, '@types/react-redux')
                    }
                  }
                ])
              }
            }
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
        task: async () => {
          await fse.copy(path.join(__dirname, 'generator', 'public'), './public');
        },
      },
      {
        title: 'Configure Typescript',
        task: async () => {
          await fse.copyFile(path.join(__dirname, 'generator', 'typescript', 'tsconfig.json'), './tsconfig.json');
        },
      },
      {
        title: 'Generate Source',
        task: () => {
          return new Listr(
            [
              {
                title: 'Add CSS',
                task: async () => await fse.copy(path.join(__dirname, 'generator', 'src', 'css'), './src/css'),
              },
              {
                title: 'Add Typescript',
                enabled: () => answers.typescript,
                task: async () => {
                  await Promise.all([
                    installDependency(answers.packagemanager, '@types/react @types/react-dom'),
                    fse.copy(path.join(__dirname, 'generator', 'src', 'typescript'), './src')
                  ]);
                },
              },
              {
                title: 'Add Javascript',
                enabled: () => !answers.typescript,
                task: async () => {
                  await fse.copy(path.join(__dirname, 'generator', 'src', 'javascript'), './src');
                },
              },
            ],
            { concurrent: true },
          );
        },
      },
    ],
    // collapse is an option that exists but isn't documented. Someone fix this in @types/listr please <3
    // @ts-ignore
    { concurrent: true, collapse: false },
  );
}
