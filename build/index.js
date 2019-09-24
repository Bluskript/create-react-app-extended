#! /usr/bin/env node
"use strict";
/**
 * @name create-rect-bundle
 * @description A small CLI program made to generate react apps with extensive features.
 * @author Bluskript
 */
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var util_1 = require("util");
var codehelper_1 = require("./helpers/codehelper");
exports.pExec = util_1.promisify(child_process_1.exec);
exports.defaultpackage = {
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
        development: [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version',
        ],
    },
    keywords: [],
    author: '',
    license: 'UNLICENSED',
    dependencies: {},
    devDependencies: {},
};
codehelper_1.generateCodeFromTemplate({
    imports: {
        test: false,
    },
    name: 'test',
    code: '<test>',
    functional: true,
    hocs: ['test'],
}, 'test');
// inquirer.prompt<IAnswers>(prompts).then((answers: IAnswers) => {
//   mkdirSync(`./${answers.projectname}`);
//   process.chdir(answers.projectname);
//   defaultpackage.name = answers.projectname;
//   defaultpackage.description = 'A React App made with create-react-app-extended';
//   fse.mkdir('./src');
//   tasks(answers)
//     .run()
//     .catch(err => {
//       console.warn(err);
//     });
// });
// process.on('unhandledRejection', err => {
//   console.log(chalk.red('Failed to create project!'));
//   console.log(chalk.red('Please report the following to the github : '));
//   console.error(err);
// });
