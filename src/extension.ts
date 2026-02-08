import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('WP Code Guardian is active.');

    checkAndInstallDependencies();

    let fixCommand = vscode.commands.registerCommand('wp-code-guardian.fixAll', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            await runFixer(editor.document);
            vscode.window.setStatusBarMessage('WP Guardian: File Fixed!', 3000);
        }
    });

    let saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
        runFixer(document);
    });

    context.subscriptions.push(fixCommand, saveListener);
}

async function checkAndInstallDependencies() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return; // Added braces (Warning Fix)
    }
    const workspaceRoot = workspaceFolders[0].uri.fsPath;

    ensureConfigFiles(workspaceRoot);

    // PHPCS Check
    const phpcsPath = path.join(workspaceRoot, 'vendor', 'bin', 'phpcs');
    if (!fs.existsSync(phpcsPath)) {
        const install = await vscode.window.showInformationMessage(
            "WPCS (PHPCS) is missing. Install WordPress standards?", "Yes", "No"
        );
        if (install === "Yes") {
            runTerminalCommand('composer require --dev wp-coding-standards/wpcs="^3.0"', workspaceRoot);
        }
    }

    // ESLint Check
    const eslintPath = path.join(workspaceRoot, 'node_modules', '.bin', 'eslint');
    if (!fs.existsSync(eslintPath)) {
        const install = await vscode.window.showInformationMessage(
            "ESLint (WordPress & React) is missing. Install now?", "Yes", "No"
        );
        if (install === "Yes") {
            runTerminalCommand('npm install @wordpress/eslint-plugin eslint-plugin-react --save-dev', workspaceRoot);
        }
    }
}

async function runFixer(document: vscode.TextDocument) {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!workspaceFolder) {
        return;
    }

    const workspaceRoot = workspaceFolder.uri.fsPath;
    const filePath = document.fileName;

    if (document.languageId === 'php') {
        const phpcbfPath = path.join(workspaceRoot, 'vendor', 'bin', 'phpcbf');
        exec(`"${phpcbfPath}" --standard=WordPress "${filePath}"`, (err) => {
            if (err) {
                console.log('PHPCS: Manual fixes required.');
            }
        });
    } 
    
    const jsLanguages = ['javascript', 'javascriptreact', 'typescriptreact'];
    if (jsLanguages.includes(document.languageId)) {
        const eslintPath = path.join(workspaceRoot, 'node_modules', '.bin', 'eslint');
        exec(`"${eslintPath}" --fix "${filePath}"`, (err) => {
            if (err) {
                console.error('ESLint fix failed', err);
            }
        });
    }
}

function runTerminalCommand(command: string, cwd: string) {
    const terminal = vscode.window.createTerminal(`WP Guardian Setup`);
    terminal.show();
    terminal.sendText(`cd "${cwd}"`);
    terminal.sendText(command);
}

function ensureConfigFiles(workspaceRoot: string) {
    const phpcsPath = path.join(workspaceRoot, 'phpcs.xml');
    if (!fs.existsSync(phpcsPath)) {
        const phpcsContent = `<?xml version="1.0"?>
<ruleset name="WordPress Rules">
    <rule ref="WordPress-Core" />
    <rule ref="WordPress-Docs" />
    <rule ref="WordPress-Extra" />
    <exclude-pattern>*/vendor/*</exclude-pattern>
    <exclude-pattern>*/node_modules/*</exclude-pattern>
</ruleset>`;
        fs.writeFileSync(phpcsPath, phpcsContent);
    }

    const eslintPath = path.join(workspaceRoot, '.eslintrc.json');
    if (!fs.existsSync(eslintPath)) {
        const eslintContent = {
            "extends": [
                "plugin:@wordpress/eslint-plugin/recommended",
                "plugin:react/recommended"
            ],
            "settings": { "react": { "version": "detect" } }
        };
        fs.writeFileSync(eslintPath, JSON.stringify(eslintContent, null, 4));
    }
}