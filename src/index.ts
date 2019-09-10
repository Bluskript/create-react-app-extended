import chalk from 'chalk';
import { exec } from 'child_process';
import { mkdirSync } from 'fs';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import { promisify } from 'util';
import installDependency from './helpers/installhelper';
import path from 'path';
import Listr from 'listr';
import { async } from 'rxjs/internal/scheduler/async';

export const pExec = promisify(exec);

const defaultpackage = {
  name: 'temp',
  version: '0.1.0',
  description: '',
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    eject: 'react-scripts eject',
  },
  browserslist: {
    production: ['>0.2%', 'not dead', 'not op_mini all'],
    development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
  },
  keywords: [],
  author: '',
  license: 'UNLICENSED',
  dependencies: {},
  devDependencies: {},
};

inquirer
  .prompt([
    {
      name: 'projectname',
      message: 'What do you wish to name your project?',
    },
    {
      name: 'repo',
      message: 'Would you like to initialize a git repository?',
      type: 'confirm',
      default: true,
    },
    {
      name: 'packagemanager',
      message: 'What package manager do you wish to use?',
      type: 'list',
      choices: ['npm', 'yarn', 'pnpm'],
    },
    {
      name: 'typescript',
      type: 'confirm',
      message: 'Do you want to use typescript?',
    },
    {
      name: 'redux',
      type: 'confirm',
      default: false,
      message: 'Do you want to add Redux?',
    },
  ])
  .then(answers => {
    const tasks = new Listr(
      [
        {
          title: 'Initialize Project',
          task: () => {
            return new Listr(
              [
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
              ],
              { concurrent: true },
            );
          },
        },
        {
          title: 'Initialize Git',
          enabled: ctx => answers.repo,
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
                  enabled: ctx => answers.typescript,
                  task: async () => {
                    await Promise.all([installDependency(answers.packagemanager, '@types/react @types/react-dom'), fse.copy(path.join(__dirname, 'generator', 'src', 'typescript'), './src')]);
                  },
                },
                {
                  title: 'Add Javascript',
                  enabled: ctx => !answers.typescript,
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
      { concurrent: true },
    );
    mkdirSync(`./${answers.projectname}`);
    process.chdir(answers.projectname);
    defaultpackage.name = answers.projectname;
    defaultpackage.description = 'A React App made with create-react-bundle';
    fse.mkdir('./src');

    tasks.run().catch(err => {
      console.warn(err);
    });
  });

process.on('unhandledRejection', err => {
  console.log(chalk.red('Failed to create project!'));
  console.log(chalk.red('Please report the following to the github : '));
  console.error(err);
});
