import * as vscode from 'vscode';
import { getSavedCommands, SavedCommand } from './config';

export class CommandsProvider implements vscode.TreeDataProvider<CommandTreeItem> {
  private readonly onDidChangeTreeDataEmitter = new vscode.EventEmitter<CommandTreeItem | undefined | void>();

  readonly onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;

  getTreeItem(element: CommandTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): CommandTreeItem[] {
    const commands = getSavedCommands();

    if (commands.length === 0) {
      return [CommandTreeItem.empty()];
    }

    return commands.map((command) => CommandTreeItem.fromCommand(command));
  }

  refresh(): void {
    this.onDidChangeTreeDataEmitter.fire();
  }
}

export class CommandTreeItem extends vscode.TreeItem {
  private constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    readonly savedCommand?: SavedCommand
  ) {
    super(label, collapsibleState);
  }

  static fromCommand(savedCommand: SavedCommand): CommandTreeItem {
    const item = new CommandTreeItem(
      savedCommand.name,
      vscode.TreeItemCollapsibleState.None,
      savedCommand
    );

    item.description = savedCommand.command;
    item.tooltip = `${savedCommand.name}\n${savedCommand.command}`;
    item.iconPath = new vscode.ThemeIcon('terminal');
    item.contextValue = 'commandDeck.command';
    item.command = {
      command: 'commandDeck.runCommand',
      title: 'Run Command',
      arguments: [savedCommand]
    };

    return item;
  }

  static empty(): CommandTreeItem {
    const item = new CommandTreeItem(
      'No commands configured',
      vscode.TreeItemCollapsibleState.None
    );

    item.description = 'Use + to add one';
    item.tooltip = 'Add a command with Command Deck: Add Command.';
    item.iconPath = new vscode.ThemeIcon('info');

    return item;
  }
}
