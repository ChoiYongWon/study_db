# MRM

> 본 문서는 [mrm 공식문서](https://mrm.js.org/docs/getting-started)를 기반으로 작성되었습니다.

**오픈 소스 프로젝트의 구성(package.json, .gitignore, .eslintrc 등)을  
 동기화 상태로 유지하는 데 도움이 되는 명령줄 도구입니다.**

  
 ## Tasks
 Task는 본인이 원하는 설정파일을 추가해주는 역할을 한다.

 Task를 수행시킬려면 2가지 방식이 있다.

 ### **Alias**
 config 파일을 통해 여러개의 Task가 동시에 실행되게끔 하는 방식
 ###  **Preset**
npm과 같은 패키지 매니저에 등록해서 공유된 설정 방식


## Configuration
Task를 설정하는 방식으로 3가지가 있다.

### Interactive mode

i 옵션을 주어서 인터렉티브(대화)하게 설정할 수 있다.  
> 사용가능한 옵션들을 모를때 대화형식으로 설정할 수 있다.
```
npx mrm eslint -i
```

### Command line parameters
또한 옵션을 주어 설정할 수 있다.
task마다의 옵션은 [여기](https://mrm.js.org/docs/mrm-preset-default)서 확인할 수 있다.
```
npx mrm license --config:name "Gandalf the Grey"
```

### Config Files
아마 가장 많이 사용하는 방식일텐데,  
~/.mrm/config.json 이나 ~/dotfiles/mrm/config.json 에 파일을 생성하여  
아래와 같이 작성할 수 있다.
> 보통 동일한 구성을 자주 사용할 경우, 새 프로젝트를 자주 생성하는 경우 사용한다.
```javascript
{
  indent: 'tab', // "tab" or number of spaces
  readmeFile: 'Readme.md', // Name of readme file
  licenseFile: 'License.md', // Name of license file
  aliases: {
    // Aliases to run multiple tasks at once
    node: ['license', 'readme', 'editorconfig', 'gitignore']
  }
}
```
