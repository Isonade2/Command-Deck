# Command Deck

Command Deck is a VS Code extension for saving common workspace shell commands and running them from an Activity Bar panel, the command palette, or a keyboard shortcut.

## Settings

Commands are stored in the workspace setting `commandDeck.commands`.

```json
{
  "commandDeck.commands": [
    {
      "name": "Build",
      "command": "npm run build"
    },
    {
      "name": "Test",
      "command": "npm test"
    }
  ]
}
```

## Commands

- `Command Deck: Run Command`: choose a saved command and run it.
- `Command Deck: Add Command`: add a command to the current workspace.
- `Command Deck: Refresh Commands`: refresh the Activity Bar list.

The default shortcut for `Command Deck: Run Command` is `Ctrl+Alt+R` on Windows/Linux and `Cmd+Alt+R` on macOS.
