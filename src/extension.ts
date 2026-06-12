import * as vscode from 'vscode';
import { addSavedCommand, getSavedCommands, isCommandSettingChange, SavedCommand } from './config';
import { CommandsProvider } from './commandsProvider';

const TERMINAL_NAME = 'Command Deck';

let commandDeckTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext): void {
  const commandsProvider = new CommandsProvider();

  const treeView = vscode.window.createTreeView('commandDeck.commands', {
    treeDataProvider: commandsProvider
  });

  context.subscriptions.push(
    treeView,
    vscode.commands.registerCommand('commandDeck.runSelected', runSelectedCommand),
    vscode.commands.registerCommand('commandDeck.addCommand', async () => {
      await addCommand();
      commandsProvider.refresh();
    }),
    vscode.commands.registerCommand('commandDeck.refreshCommands', () => commandsProvider.refresh()),
    vscode.commands.registerCommand('commandDeck.runCommand', runSavedCommand),
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (isCommandSettingChange(event)) {
        commandsProvider.refresh();
      }
    }),
    vscode.window.onDidCloseTerminal((terminal) => {
      if (terminal === commandDeckTerminal) {
        commandDeckTerminal = undefined;
      }
    })
  );
}

export function deactivate(): void {
  commandDeckTerminal = undefined;
}

async function runSelectedCommand(): Promise<void> {
  const commands = getSavedCommands();

  if (commands.length === 0) {
    const addCommandLabel = 'Add Command';
    const selected = await vscode.window.showInformationMessage(
      'No Command Deck commands are configured.',
      addCommandLabel
    );

    if (selected === addCommandLabel) {
      await vscode.commands.executeCommand('commandDeck.addCommand');
    }

    return;
  }

  const selected = await vscode.window.showQuickPick(
    commands.map((savedCommand) => ({
      label: savedCommand.name,
      description: savedCommand.command,
      savedCommand
    })),
    {
      title: 'Command Deck',
      placeHolder: 'Select a command to run'
    }
  );

  if (!selected) {
    return;
  }

  await runSavedCommand(selected.savedCommand);
}

async function addCommand(): Promise<void> {
  const name = await vscode.window.showInputBox({
    title: 'Command Deck',
    prompt: 'Command name',
    placeHolder: 'Build',
    validateInput: (value) => value.trim() ? undefined : 'Enter a command name.'
  });

  if (name === undefined) {
    return;
  }

  const command = await vscode.window.showInputBox({
    title: 'Command Deck',
    prompt: 'Shell command',
    placeHolder: 'npm run build',
    validateInput: (value) => value.trim() ? undefined : 'Enter a shell command.'
  });

  if (command === undefined) {
    return;
  }

  try {
    await addSavedCommand({
      name: name.trim(),
      command: command.trim()
    });

    vscode.window.showInformationMessage(`Added Command Deck command: ${name.trim()}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add Command Deck command.';
    vscode.window.showErrorMessage(message);
  }
}

async function runSavedCommand(savedCommand: SavedCommand | undefined): Promise<void> {
  if (!savedCommand) {
    return;
  }

  const terminal = getCommandDeckTerminal();
  terminal.show();

  if (terminal.shellIntegration) {
    terminal.shellIntegration.executeCommand(savedCommand.command);
    return;
  }

  terminal.sendText(savedCommand.command, true);
}

function getCommandDeckTerminal(): vscode.Terminal {
  if (commandDeckTerminal) {
    return commandDeckTerminal;
  }

  commandDeckTerminal = vscode.window.terminals.find((terminal) => terminal.name === TERMINAL_NAME)
    ?? vscode.window.createTerminal(TERMINAL_NAME);

  return commandDeckTerminal;
}
