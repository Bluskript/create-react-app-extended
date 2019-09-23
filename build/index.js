#! /usr/bin/env node
"use strict";
/**
 * @name create-rect-bundle
 * @description A small CLI program made to generate react apps with extensive features.
 * @author Bluskript
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var util_1 = require("util");
var prompts_1 = require("./prompts");
var tasks_1 = require("./tasks");
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
        development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
    },
    keywords: [],
    author: '',
    license: 'UNLICENSED',
    dependencies: {},
    devDependencies: {},
};
inquirer_1.default.prompt(prompts_1.prompts).then(function (answers) {
    fs_1.mkdirSync("./" + answers.projectname);
    process.chdir(answers.projectname);
    exports.defaultpackage.name = answers.projectname;
    exports.defaultpackage.description = 'A React App made with create-react-app-extended';
    fs_extra_1.default.mkdir('./src');
    tasks_1.tasks(answers)
        .run()
        .catch(function (err) {
        console.warn(err);
    });
});
process.on('unhandledRejection', function (err) {
    console.log(chalk_1.default.red('Failed to create project!'));
    console.log(chalk_1.default.red('Please report the following to the github : '));
    console.error(err);
});
