import inquirer from 'inquirer';
import chalk from 'chalk';
import { mkdirSync } from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';

const pExec = promisify(exec);

inquirer
  .prompt([
    {
      name: 'projectname',
      message: 'What do you wish to name your project?',
    },
    {
      name: 'packagemanager',
      message: 'What package manager do you wish to use?',
      type: 'list',
      choices: ['npm', 'yarn'],
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
    pExec('npm init -y').then(() => {});
  });
