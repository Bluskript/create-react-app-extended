"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var prettier_1 = __importDefault(require("prettier"));
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
        var template = JSON.parse(fs_extra_1.default.readFileSync(templatefile, { encoding: 'utf8' }));
        var generated = '';
        generated += generateImports(template);
        if (template.functional) {
            generated += generateFunctionalComponent(template);
        }
        else {
            generated += generateClassComponent(template);
        }
        generated += generateExport(template);
        generated = prettier_1.default.format(generated, { parser: 'babel' });
        fs_extra_1.default.writeFile(targetpath, generated, function () { return resolve(); });
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
        var generated = '';
        generated += generateImports(template);
        if (template.functional) {
            generated += generateFunctionalComponent(template);
        }
        else {
            generated += generateClassComponent(template);
        }
        generated += generateExport(template);
        generated = prettier_1.default.format(generated, { parser: 'babel' });
        fs_extra_1.default.writeFile(targetpath, generated, function () { return resolve(); });
    });
}
exports.generateCodeFromTemplate = generateCodeFromTemplate;
/**
 * Generates imports for the component
 * @param template the template object used to generate
 */
function generateImports(template) {
    var output = '';
    output += "import React from 'react';\n";
    Object.keys(template.imports).map(function (key) {
        output += "import " + (template.imports[key].destructure ? '{ ' : '');
        output += "" + key;
        output += "" + (template.imports[key].destructure ? ' } ' : '');
        output += " from '" + template.imports[key].package + "';";
        output += '\n';
    });
    return output;
}
/**
 * Generates the class for the class component
 * @param template the template object used to generate
 */
function generateClassComponent(template) {
    var output = '';
    if (template.typescript) {
        output += "type " + template.name + "State = {}\n\n";
    }
    output += "class " + template.name + " extends React.Component";
    if (template.typescript) {
        output += "<{}, " + template.name + "State>";
    }
    output += " {\n";
    output += "render() {\nreturn " + template.code + "\n}\n}";
    return output;
}
/**
 * Generates a function for the functional component
 * @param template the template object used to generate
 */
function generateFunctionalComponent(template) {
    var output = '';
    if (template.typescript) {
        output += "type " + template.name + "Props = {}\n\n";
    }
    output += "const " + template.name + ": React.FunctionComponent<" + template.name + "Props> = ({}) => {\n" + template.code + "\n}\n";
    return output;
}
/**
 * Generates an export with HOCs (Higher Order Components)
 * @param template the template object used to generate
 */
function generateExport(template) {
    var output = '\nexport default ';
    template.hocs.map(function (hoc) {
        output += hoc + "(";
    });
    output += "" + template.name;
    output += ')'.repeat(template.hocs.length) + ';';
    return output;
}
