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
import { IAnswers } from './types';
import { tasks } from './tasks';

export const pExec = promisify(exec);

export const defaultpackage = {
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
  .then((answers: IAnswers) => {
    mkdirSync(`./${answers.projectname}`);
    process.chdir(answers.projectname);
    defaultpackage.name = answers.projectname;
    defaultpackage.description = 'A React App made with create-react-bundle';
    fse.mkdir('./src');

    tasks(answers)
      .run()
      .catch(err => {
        console.warn(err);
      });
  });

process.on('unhandledRejection', err => {
  console.log(chalk.red('Failed to create project!'));
  console.log(chalk.red('Please report the following to the github : '));
  console.error(err);
});
