#!/usr/bin/env node
import prompts from 'prompts';
import { cac } from 'cac';
import { downloadTemplate } from './helpers/download.js';
import { postInstall } from './helpers/postInstall.js';
import { editPackageJson } from './helpers/edit_package_json.js';

const cli = cac('create-discordjs-app');
cli
  .command('[projectName]', 'Create a new Discord.js app')
  .action(async (target = '') => {
    const res = await prompts([
        {
            type: target ? null : 'text',
            name: 'projectName',
            message: 'Project name:',
            initial: target || 'my-discord-bot'
        },
        {
            type: 'toggle',
            name: 'useTypeScript',
            message: 'Use TypeScript?',
            initial: true,
            active: 'yes',
            inactive: 'no'
        },
        {
            type: 'toggle',
            name: 'useGit',
            message: 'Initialize a git repository?',
            initial: true,
            active: 'yes',
            inactive: 'no'
        },
        {
            type: 'select',
            name: 'packageManager',
            message: 'Choose a package manager:',
            choices: [
                { title: 'npm', value: 'npm' },
                { title: 'yarn', value: 'yarn' },
                { title: 'bun', value: 'bun' },
                { title: 'pnpm', value: 'pnpm' }
            ],
            initial: 0
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: (prev, values) => `Create a Discord.js app named "${values.projectName}" with TypeScript: ${values.useTypeScript} and Git: ${values.useGit}?`,
            initial: true
        }
    ]);
    const { projectName, useTypeScript, useGit, packageManager } = res;
    if (!projectName) {
      console.error('❌Project name is required!');
      process.exit(1);
    }
    console.log(`🚀Creating Discord.js app: ${projectName}`)
    try {
        await downloadTemplate(projectName, useTypeScript);
        await postInstall(projectName, useTypeScript, useGit, packageManager);
        await editPackageJson(projectName, useTypeScript);
    } catch (error: any) {
        console.error('❌Error creating Discord.js app:', error);
        process.exit(1);
    }
    console.log(`🎉Discord.js app "${projectName}" created successfully!`);
    process.exit(0);
  })