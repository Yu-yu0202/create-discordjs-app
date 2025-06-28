import { execa } from 'execa';
import * as path from 'path';
import * as fs from 'fs';

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

const dependencies = [
    'discord.js',
    'dotenv'
];
const devDependencies = [
    '@types/discord.js'
];
const typescriptDependencies = [
    'typescript',
    'ts-node'
];

function validatePackageManager(packageManager: string): packageManager is PackageManager {
    const validManagers: PackageManager[] = ['npm', 'yarn', 'pnpm', 'bun'];
    return validManagers.includes(packageManager as PackageManager);
}

function validateProjectName(projectName: string): boolean {
    if (projectName.includes('..') || projectName.includes('/') || projectName.includes('\\')) {
        return false;
    }
    if (!projectName || projectName.trim() === '' || /[<>:"|?*]/.test(projectName)) {
        return false;
    }
    return true;
}

export async function postInstall(projectName: string, useTypeScript: boolean, useGit: boolean, packageManager: PackageManager): Promise<void> {
    if (!validateProjectName(projectName)) {
        throw new Error('Invalid project name. Project name contains invalid characters or path traversal attempts.');
    }

    if (!validatePackageManager(packageManager)) {
        throw new Error('Invalid package manager specified.');
    }

    const cwd = path.resolve(process.cwd(), projectName);
    
    if (!fs.existsSync(cwd)) {
        throw new Error(`Project directory does not exist: ${cwd}`);
    }

    console.log('📦installing dependencies...');
    
    try {
        const installPromises = [];
        
        for (const dep of dependencies) {
            console.debug(`Installing dependency: ${dep}`);
            installPromises.push(
                execa(packageManager, ['install', dep], { cwd, stdio: 'inherit' })
                    .catch((error: unknown) => {
                        console.error(`❌Error installing ${dep}:`, error);
                        throw error;
                    })
            );
        }
        
        for (const dep of devDependencies) {
            console.debug(`Installing devDependency: ${dep}`);
            installPromises.push(
                execa(packageManager, ['install', dep, '--save-dev'], { cwd, stdio: 'inherit' })
                    .catch((error: unknown) => {
                        console.error(`❌Error installing ${dep}:`, error);
                        throw error;
                    })
            );
        }
        
        if (useTypeScript) {
            for (const dep of typescriptDependencies) {
                console.debug(`Installing TypeScript dependency: ${dep}`);
                installPromises.push(
                    execa(packageManager, ['install', dep, '--save-dev'], { cwd, stdio: 'inherit' })
                        .catch((error: unknown) => {
                            console.error(`❌Error installing ${dep}:`, error);
                            throw error;
                        })
                );
            }
        }
        
        await Promise.all(installPromises);
        console.log('✅Dependencies installed successfully!');
        
    } catch (error) {
        console.error('❌Error installing dependencies:', error);
        throw error;
    }

    if (useGit) {
        console.log('🗃️ Initializing git repository...');
        try {
            await execa('git', ['init'], { cwd, stdio: 'inherit' });
            console.log('✅Git repository initialized successfully!');
            await execa('git', ['add', '.'], { cwd, stdio: 'inherit' });
            await execa('git', ['commit', '-m', 'Initial commit'], { cwd, stdio: 'inherit' });
            console.log('✅Initial commit created successfully!');
        } catch (error) {
            console.error('❌Error initializing git repository:', error);
            throw error;
        }
    }
}