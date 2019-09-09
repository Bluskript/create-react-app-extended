import chalk from 'chalk';
import { exec } from 'child_process';
import { mkdirSync } from 'fs';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import { promisify } from 'util';
import installDependency from './helpers/installhelper';
import path from 'path';

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
    mkdirSync(`./${answers.projectname}`);
    process.chdir(answers.projectname);

    defaultpackage.name = answers.projectname;
    defaultpackage.description = 'A React App made with create-react-bundle';

    if (answers.repo) {
      pExec('git init').then(() => {
        console.log('✔️ Git initialized');
      });
    }

    fse.writeFileSync('./package.json', JSON.stringify(defaultpackage));

    console.log('✔️ Initialized Project');
    console.log('Installing React Core...');
    installDependency(answers.packagemanager, 'react react-dom react-scripts').then(() => console.log('✔️ Installed React Core'));

    fse.copy(path.join(__dirname, 'generator', 'public'), './public').then(() => console.log('✔️ Added public resources'));
    fse.mkdir('./src');
    fse.copy(path.join(__dirname, 'generator', 'src', 'css'), './src/css').then(() => console.log('✔️ Added CSS'));
    switch (answers.typescript) {
      case true:
        fse.copyFile(path.join(__dirname, 'generator', 'typescript', 'tsconfig.json'), './tsconfig.json').then(() => {
          console.log('✔️ Successfully configured Typescript');
        });
        installDependency(answers.packagemanager, '@types/react @types/react-dom').then(() => console.log('✔️ Installed required types'));
        fse.copy(path.join(__dirname, 'generator', 'src', 'typescript'), './src').then(() => console.log('✔️ Added Typescript Sources'));
        break;
      case false:
        fse.copy(path.join(__dirname, 'generator', 'src', 'javascript'), './src').then(() => console.log('✔️ Added Javascript Sources'));
        break;
    }
  });

process.on('unhandledRejection', err => {
  console.log(chalk.red('Failed to create project!'));
  console.log(chalk.red('Please report the following to the github : '));
  console.error(err);
});
