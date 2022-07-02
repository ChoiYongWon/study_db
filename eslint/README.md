# ESLINT

> 본 문서는 [eslint 공식문서](https://eslint.org/docs/latest/user-guide/)를 기반으로 작성되었습니다.

**사용목적**
> Eslint는 코드스타일이나 문법에 규칙을 걸어서 사용자가 보다 더 깔끔하고 유지보수하기 쉬운 코드를 짤 수 있도록 도와주는 라이브러리이다.

# 설정
각 사용자마다 코딩스타일이 다르므로 본인의 입맛에 맞게 설정을 해줘야한다.  

Eslint 에서는 3가지 설정 방식을 지원한다.
1. .eslintrc.* 파일을 생성하는 방법
```json
{
    "env": {
        "browser": true,
        "node": true
    }
}
```
2. package.json 에서 eslintConfig 필드를 사용하는 방법
```json
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```
3. 파일 내에서 주석으로 설정하는 방법
```javascript
/* eslint-env node, mocha */
```

# 설정파일 설정 옵션
## **env**
> lint가 실행될 환경을 명시해줌  

ex) 
- browser
- node
- commonjs
- shared-node-browser
- es6
- es2016
- es2017
- es2018
- es2019
- es2020
- es2021
- es2022
- worker
- amd
- mocha
- jasmine
- jest
- phantomjs
- protractor
- qunit
- jquery
- prototypejs
- shelljs
- meteor
- mongo
- applescript
- nashorn
- serviceworker
- atomtest
- embertest
- webextensions
- greasemonkey
```javascript
{
    "env": {
        "browser": true,
        "node": true
    }
}
```

## **plugins**
> 위에서 설정한 환경 이외의 환경을 불러오고 싶을때 플러그인을 사용함  
ex) react
```javascript
{
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
```

## **globals**  
> Eslint 에서 no-undef 라는 린터 규칙이 있는데, 선언되지 않은 변수에 대해서 접근할려고할때,  
컴파일 오류가 생긴다. 이걸 방지하기 위해 globals에 선언해준다.
false 는 readable, true 는 writable 이다.  
또한, off 로 해당 전역변수를 비활성화 할수도있다.  
예제에서는 es6환경에서 Promise를 비활성화 한 예이다.
  
```javascript
{
    "env": {
        "es6": true
    },
    "globals": {
        "Promise": "off"
    }
}
```

## **parserOptions**
> 지원하려는 Javascript의 옵션을 지정할 수 있다
```javascript
{
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```  

### **env vs ecmaVersion**  

이쯤되면 의문이 생길수도 있다.  

분명 js의 버전을 명시하는 필드가 있었다. ( env -> es6 : true )  

근데 parserOptions에도 ecmaVersion이 존재한다.  

설명을 하자면,  

**env 필드에서 명시한 버전은** 해당 버전에서의 전역변수를 가져오는것이고 ex) Promise, Set 등

**parserOptions에서 명시한 버전은** 해당 버전의 문법을 준수하겠다는 뜻이다.  

## **parser**
> 기본적으로 Eslint는 구문분석을 위해 Espree parser를 사용한다.  
필요에 따라 바꿀 수 있으며,  
Eslint와 호환되는 파서는 다음 3가지가 있다.  
- esprima
- @babel/eslint-parser
- @typescript-eslint/parser  

```javascript
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
```  

## **rules**
> Eslint의 꽃이다.  
Eslint는 방대한 Rules를 제공하는데, 사용자의 입맛대로 준수하고 싶은 규칙들을 골라서 rules 필드에 넣으면 된다.  
 여기서 모든 규칙들을 볼수있다. [모든 rules](https://eslint.org/docs/latest/rules/)


rules를 추가하기 위해선 지켜야할 형식이있는데,  
key 값으로 원하는 규칙을 적어준다음 다음과 같은 value를 지정해줘야한다.  
- "off" or 0
- "warn" or 1
- "error" or 2  

rule도 파일마다 명시할수도 있고, .eslintrc.* 와 같이 단일 파일내에서 명시해줄 수 있다.
[공식문서 참고](https://eslint.org/docs/latest/user-guide/configuring/rules)
```javascript
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"]
    }
}
```  





# Reference
[Eslint 공식문서](https://eslint.org/docs)  

[How and When to Configure Global Variables in ESLint](https://smartdevpreneur.com/how-and-when-to-specify-globals-in-eslintrc-a-detailed-example-with-configs-and-results/)

