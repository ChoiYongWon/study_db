
# Asset Module

Asset Module은 Asset 파일 (파일, 폰트, 사진 등)을 번들링할 수 있도록 도와주는 Module이다

일종의 로더처럼 정규표현식으로 설정한 파일들을 모듈을 통해 처리하고 번들링한다

본 글은 webpack 5을 기준으로 작성되었다

## Usage

일반적인 loader 설정 방법과 비슷하다

```jsx
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

module에 rules에서 type으로 asset module을 정의한다

webpack에는 4가지의 Asset Module이 있다

`asset/resource`

`asset/inline`

`asset/source`

`asset`

## asset/resource

파일을 그대로 번들링하고 해당파일 위치(URL)를 추출하는 방식

번들링 전

번들링 후

![before_bundling](https://user-images.githubusercontent.com/40623433/180764900-780fc3b6-967c-43a9-891a-87ba9825d3d4.png)

![after_bundling](https://user-images.githubusercontent.com/40623433/180765310-25d6e55d-0717-4044-96c3-2a092e6c42b9.png)

### Asset custom output name

asset/resource는 파일을 output 디렉토리로 내보낼때,

webpack 기본설정 filename인 [hash][ext][query]으로 변경되어 번들링된다

![asset_custom_output_name](https://user-images.githubusercontent.com/40623433/180765462-c0e3ed81-2830-4c65-b83c-2b4b881ff883.png)


webpack 설정에서 output 필드에 `assetModuleFilename` 를 이용하여 output name을 설정할 수 있다.

webpack.config.js

```jsx
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

 위 설정은 번들링 되기전 파일 이름을 그대로 사용하는 설정이다

대괄호 안의 문자열을 Template Strings라고 하며, webpack 번들링 과정에서 대치되는 방식이다

위 예제에서 사용한 Template Strings는 name ( 파일 이름 )과 ext ( 파일 확장자 ) 이다

![template_string](https://user-images.githubusercontent.com/40623433/180765549-4d115ed9-a11b-41ff-9d0a-4121cb29a965.png)

Template Strings는 [여기](https://webpack.js.org/configuration/output/#template-strings) 서 더 알아볼 수 있다

## asset/inline

파일을 data-url로 변환시켜 그대로 내장하는 방식

webpack에서는 기본적으로 base64 인코딩을 사용하여 data-url을 생성한다.

**번들링된 main.js**

![base64](https://user-images.githubusercontent.com/40623433/180765639-6f9fc7d4-28bc-418c-bdaf-0aa03760e388.png)


하지만 본인의 입맛대로 data-url을 생성할 수 있으며,

webpack은 이를 지원한다.

webpack.config.js

```jsx
const path = require('path');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
		    generator: {
			    dataUrl: content => {
		         content = content.toString();
		         return svgToMiniDataURI(content);
		      }
		    }
      }
    ]
  },
};
```

위 코드는 

generator에 dataUrl 프로퍼티에 인코딩 함수를 넘겨주어,

커스텀 인코딩을 지원하는 코드다

mini-svg-data-url 라는 인코딩 라이브러리를 import해서 커스텀 인코딩 함수를 구현한 사례다

위 설정파일로 webpack을 실행하면 모든 svg파일들은 mini-svg-data-url 패키지를 통해 인코딩된다

## asset/source

asset/source는 asset 파일을 string 형태로 불러온다

test.txt 파일에 **안녕하세요** 를 저장하고 번들링한 결과이다

**번들링된 main.js**

![raw](https://user-images.githubusercontent.com/40623433/180765738-f7624cb4-9c5b-4cde-b919-b60bff1aed93.png)

이미지를 string으로 불러오면 이미지의 유니코드값을 불러오며,

실제로 이미지가 깨진다

## asset

asset 타입은 webpack의 기본 조건에 따라서 resource와 inline중에서 자동으로 선택된다

크기가 8kb 미만인 파일은 inline, 그 이상은 resource 모듈로 처리된다

기본 조건도 사용자의 입맛대로 바꿀 수 있다

webpack.config.js

```jsx
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
	      parser: {
	        dataUrlCondition: {
	          maxSize: 4 * 1024 // 4kb
	        }
	      }
      }
    ]
  },
};
```

parser에 dataUrlCondition에 maxSize 값을 수정하면된다