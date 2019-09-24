import fse from 'fs-extra';
import { pExec } from '..';
import { ITemplate } from '../types';

/**
 * Generates code from a template file
 * @param templatefile The file to read template code from
 * @param targetpath The path to emit the generated template
 */
export function generateCodeFromFile(templatefile: string, targetpath: string) {
  return new Promise((resolve, reject) => {
    if (!fse.existsSync(templatefile)) {
      reject('Template file does not exist');
      return;
    }
  });
}

/**
 * Generates code from a template object
 * @param template the template object used to model
 * @param targetpath The path to emit the generated template
 */
export function generateCodeFromTemplate(template: ITemplate, targetpath: string) {
  return new Promise((resolve, reject) => {
    let output: string;
    Object.keys(template.imports).map(key => {
      console.log(key);
    });
  });
}
