import degit from 'degit';

function validateProjectName(projectName: string): boolean {
    if (projectName.includes('..') || projectName.includes('/') || projectName.includes('\\')) {
        return false;
    }
    if (!projectName || projectName.trim() === '' || /[<>:"|?*]/.test(projectName)) {
        return false;
    }
    return true;
}

export async function downloadTemplate(projectName: string, useTypeScript: boolean): Promise<void> {
    if (!validateProjectName(projectName)) {
        throw new Error('Invalid project name. Project name contains invalid characters or path traversal attempts.');
    }

    const branch = useTypeScript ? 'typescript' : 'javascript';
    const emitter = degit(`Yu-yu0202/create-discordjs-app#templates_${branch}`, {
        cache: false,
        force: true,
        verbose: true
    });

    return new Promise((resolve, reject) => {
        emitter
            .clone(projectName)
            .then(() => {
                console.log('✅Template downloaded successfully!');
                resolve();
            })
            .catch((error) => {
                console.error('❌Error downloading template:', error);
                reject(error);
            });
    });
}