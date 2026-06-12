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

---

# Command Deck 한국어 안내

Command Deck은 자주 사용하는 워크스페이스 쉘 명령어를 저장하고, VS Code의 Activity Bar 패널, 커맨드 팔레트, 단축키에서 바로 실행할 수 있게 해주는 익스텐션입니다.

## 설정

명령어 목록은 워크스페이스 설정인 `commandDeck.commands`에 저장됩니다.

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

## 명령어

- `Command Deck: Run Command`: 저장된 명령어를 선택해서 실행합니다.
- `Command Deck: Add Command`: 현재 워크스페이스에 새 명령어를 추가합니다.
- `Command Deck: Refresh Commands`: Activity Bar의 명령어 목록을 새로고침합니다.

`Command Deck: Run Command`의 기본 단축키는 Windows/Linux에서 `Ctrl+Alt+R`, macOS에서 `Cmd+Alt+R`입니다.

## 사용 흐름

1. VS Code에서 Command Deck Activity Bar 패널을 엽니다.
2. 패널 상단의 추가 버튼을 눌러 명령어 이름과 쉘 명령어를 입력합니다.
3. 목록에서 명령어를 클릭하거나 `Ctrl+Alt+R`로 선택창을 열어 실행합니다.
4. 실행 결과는 `Command Deck` 전용 터미널에서 확인합니다.
