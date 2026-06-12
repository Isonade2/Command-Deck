# Command Deck 작업 컨텍스트

## 현재 프로젝트

- 프로젝트명: `Command Deck`
- 패키지명: `command-deck`
- 목적: 반복적으로 사용하는 워크스페이스 쉘 명령어를 VS Code 안에서 저장하고 버튼/커맨드 팔레트/단축키로 실행하는 Extension
- 기술 스택: TypeScript, VS Code Extension API, Node.js
- 현재 브랜치: `master`
- 원격 추적: `origin/master`

## 구현된 기능

- Activity Bar에 `Command Deck` 전용 패널 표시
- `commandDeck.commands` 워크스페이스 설정에서 명령어 목록 읽기
- Tree View에 저장된 명령어 표시
- Tree View 항목 클릭으로 명령어 실행
- `Command Deck: Run Command`으로 Quick Pick 실행
- `Command Deck: Add Command`으로 명령어 이름/쉘 명령어 입력 후 저장
- `Command Deck: Refresh Commands`으로 목록 새로고침
- 기본 단축키 `Ctrl+Alt+R` 등록
- `Command Deck` 이름의 공용 터미널을 재사용해 명령어 실행
- Shell Integration이 가능하면 `executeCommand`, 아니면 `sendText` 사용

## 주요 파일

- `package.json`: Extension 메타데이터, 명령, 설정, 단축키, Activity Bar contribution 선언
- `src/extension.ts`: Extension 활성화, 커맨드 등록, 입력 UI, 터미널 실행 로직
- `src/config.ts`: `commandDeck.commands` 설정 읽기/쓰기와 데이터 검증
- `src/commandsProvider.ts`: Activity Bar Tree View Provider와 Tree Item 구성
- `media/icon.svg`: Activity Bar 아이콘
- `README.md`: 영어/한국어 사용 안내
- `docs/Command Deck 포트폴리오 정리.md`: Obsidian용 포트폴리오 정리 문서

## 명령어 설정 예시

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

## 실행 및 테스트 방법

1. 의존성 설치

```powershell
npm.cmd install
```

2. TypeScript 컴파일

```powershell
npm.cmd run compile
```

3. VS Code에서 `F5` 실행

- 새 `Extension Development Host` 창이 열린다.
- Activity Bar에서 `Command Deck` 패널을 확인한다.
- `+` 버튼으로 테스트 명령어를 추가한다.
- 목록 클릭, 커맨드 팔레트, `Ctrl+Alt+R`로 실행을 확인한다.

## Windows 참고

PowerShell 실행 정책 때문에 `npm`이 막히면 `npm.cmd`를 사용한다.

```powershell
npm.cmd install
npm.cmd run compile
```

## 포트폴리오 문서

Obsidian에서 다음 파일을 열면 프로젝트 구조와 설명을 확인할 수 있다.

```text
docs/Command Deck 포트폴리오 정리.md
```

포함 내용:

- 프로젝트 개요
- 개발 배경
- 전체 프로그램 구조
- Mermaid 구조 다이어그램
- 주요 파일 역할
- 실행 흐름
- 테스트 방법
- 향후 개선 아이디어
- 포트폴리오 요약 문장

## 향후 개선 후보

- 명령어 수정/삭제 기능
- 명령어 그룹 기능
- 명령별 아이콘 지정
- 명령별 작업 디렉터리 지정
- 실행 성공/실패 상태 표시
- 최근 실행 명령어 표시
- 전역 명령어와 워크스페이스 명령어 병합
- `.vsix` 패키징과 Marketplace 배포

## 마지막 확인 사항

- `npm.cmd run compile`은 이전 작업에서 성공했다.
- `node_modules/`와 `out/`은 `.gitignore` 대상이다.
- `package-lock.json`은 의존성 재현을 위해 유지하는 것이 좋다.
