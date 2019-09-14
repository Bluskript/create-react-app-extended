export const prompts = [
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
];
