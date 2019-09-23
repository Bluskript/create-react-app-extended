#! /usr/bin/env node
/**
 * @name create-rect-bundle
 * @description A small CLI program made to generate react apps with extensive features.
 * @author Bluskript
 */

import chalk from 'chalk';
import { exec } from 'child_process';
import { mkdirSync } from 'fs';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import { promisify } from 'util';
import { IPackage } from './defaultpackage';
import { prompts } from './prompts';
import { tasks } from './tasks';
import { IAnswers } from './types';

export const pExec = promisify(exec);

export const defaultpackage: IPackage = {
  name: 'temp',
  version: '0.1.0',
  description: '',
  private: true,
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

inquirer.prompt<IAnswers>(prompts).then((answers: IAnswers) => {
  mkdirSync(`./${answers.projectname}`);
  process.chdir(answers.projectname);
  defaultpackage.name = answers.projectname;
  defaultpackage.description = 'A React App made with create-react-app-extended';
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
