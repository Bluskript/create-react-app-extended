"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * Generates code from a template file
 * @param templatefile The file to read template code from
 * @param targetpath The path to emit the generated template
 */
function generateCodeFromFile(templatefile, targetpath) {
    return new Promise(function (resolve, reject) {
        if (!fs_extra_1.default.existsSync(templatefile)) {
            reject('Template file does not exist');
            return;
        }
    });
}
exports.generateCodeFromFile = generateCodeFromFile;
/**
 * Generates code from a template object
 * @param template the template object used to model
 * @param targetpath The path to emit the generated template
 */
function generateCodeFromTemplate(template, targetpath) {
    return new Promise(function (resolve, reject) {
        var output;
        Object.keys(template.imports).map(function (key) {
            console.log(key);
        });
    });
}
exports.generateCodeFromTemplate = generateCodeFromTemplate;
