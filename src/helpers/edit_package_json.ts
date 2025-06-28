import fs from 'fs';
import path from 'path';

function validateProjectName(projectName: string): boolean {
    if (projectName.includes('..') || projectName.includes('/') || projectName.includes('\\')) {
        return false;
    }
    if (!projectName || projectName.trim() === '' || /[<>:"|?*]/.test(projectName)) {
        return false;
    }
    return true;
}

export async function editPackageJson(projectName: string, useTypeScript: boolean): Promise<void> {
    if (!validateProjectName(projectName)) {
        throw new Error('Invalid project name. Project name contains invalid characters or path traversal attempts.');
    }

    const projectPath = path.resolve(process.cwd(), projectName);
    const packageJsonPath = path.join(projectPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
        throw new Error(`package.json not found in project directory: ${packageJsonPath}`);
    }

    try {
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
        let packageJson = JSON.parse(packageJsonContent);

        packageJson.name = projectName;
        packageJson.main = useTypeScript ? 'dist/index.js' : 'index.js';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅package.json updated successfully!');
    } catch (error) {
        console.error('❌Error updating package.json:', error);
        throw error;
    }
}