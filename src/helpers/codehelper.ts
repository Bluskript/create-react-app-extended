import fse from 'fs-extra';
import prettier from 'prettier';
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
    const template: ITemplate = JSON.parse(
      fse.readFileSync(templatefile, { encoding: 'utf8' }),
    );
    let generated = '';
    generated += generateImports(template);
    if (template.functional) {
      generated += generateFunctionalComponent(template);
    } else {
      generated += generateClassComponent(template);
    }
    generated += generateExport(template);
    generated = prettier.format(generated, { parser: 'babel' });
    fse.writeFile(targetpath, generated, () => resolve());
  });
}

/**
 * Generates code from a template object
 * @param template the template object used to model
 * @param targetpath The path to emit the generated template
 */
export function generateCodeFromTemplate(template: ITemplate, targetpath: string) {
  return new Promise((resolve, reject) => {
    let generated = '';
    generated += generateImports(template);
    if (template.functional) {
      generated += generateFunctionalComponent(template);
    } else {
      generated += generateClassComponent(template);
    }
    generated += generateExport(template);
    generated = prettier.format(generated, { parser: 'babel' });
    fse.writeFile(targetpath, generated, () => resolve());
  });
}

/**
 * Generates imports for the component
 * @param template the template object used to generate
 */
function generateImports(template: ITemplate): string {
  let output: string = '';
  output += `import React from 'react';\n`;
  Object.keys(template.imports).map(key => {
    output += `import ${template.imports[key].destructure ? '{ ' : ''}`;
    output += `${key}`;
    output += `${template.imports[key].destructure ? ' } ' : ''}`;
    output += ` from '${template.imports[key].package}';`;
    output += '\n';
  });
  return output;
}

/**
 * Generates the class for the class component
 * @param template the template object used to generate
 */
function generateClassComponent(template: ITemplate): string {
  let output = '';
  if (template.typescript) {
    output += `type ${template.name}State = {}\n\n`;
  }
  output += `class ${template.name} extends React.Component`;
  if (template.typescript) {
    output += `<{}, ${template.name}State>`;
  }
  output += ` {\n`;
  output += `render() {\nreturn ${template.code}\n}\n}`;
  return output;
}

/**
 * Generates a function for the functional component
 * @param template the template object used to generate
 */
function generateFunctionalComponent(template: ITemplate): string {
  let output = '';
  if (template.typescript) {
    output += `type ${template.name}Props = {}\n\n`;
  }
  output += `const ${template.name}: React.FunctionComponent<${template.name}Props> = ({}) => {\n${template.code}\n}\n`;
  return output;
}

/**
 * Generates an export with HOCs (Higher Order Components)
 * @param template the template object used to generate
 */
function generateExport(template: ITemplate): string {
  let output = '\nexport default ';
  template.hocs.map(hoc => {
    output += `${hoc}(`;
  });
  output += `${template.name}`;
  output += ')'.repeat(template.hocs.length) + ';';
  return output;
}
