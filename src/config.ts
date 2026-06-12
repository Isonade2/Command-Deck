import * as vscode from 'vscode';

export const COMMANDS_SETTING = 'commands';
export const CONFIG_SECTION = 'commandDeck';

export interface SavedCommand {
  name: string;
  command: string;
}

export function getSavedCommands(): SavedCommand[] {
  const configured = vscode.workspace
    .getConfiguration(CONFIG_SECTION)
    .get<unknown[]>(COMMANDS_SETTING, []);

  return configured
    .map(normalizeCommand)
    .filter((command): command is SavedCommand => command !== undefined);
}

export async function addSavedCommand(command: SavedCommand): Promise<void> {
  if (!vscode.workspace.workspaceFolders?.length) {
    throw new Error('Open a folder or workspace before adding Command Deck commands.');
  }

  const commands = getSavedCommands();
  const updatedCommands = [...commands, command];

  await vscode.workspace
    .getConfiguration(CONFIG_SECTION)
    .update(COMMANDS_SETTING, updatedCommands, vscode.ConfigurationTarget.Workspace);
}

export function isCommandSettingChange(event: vscode.ConfigurationChangeEvent): boolean {
  return event.affectsConfiguration(`${CONFIG_SECTION}.${COMMANDS_SETTING}`);
}

function normalizeCommand(value: unknown): SavedCommand | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const candidate = value as Record<string, unknown>;
  const name = typeof candidate.name === 'string' ? candidate.name.trim() : '';
  const command = typeof candidate.command === 'string' ? candidate.command.trim() : '';

  if (!name || !command) {
    return undefined;
  }

  return { name, command };
}
